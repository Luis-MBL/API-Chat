import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  interface IParams {
    text: string;
    email: string;
  }

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { email, text } = params as IParams;
    let user_id;
    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create({ email });
      user_id = user.id;
      await connectionsService.create({
        socket_id,
        user_id,
      });
    } else {
      user_id = userExists.id;
      await connectionsService.create({
        socket_id,
        user_id,
      });
      const connection = await connectionsService.findByUserId(userExists.id);
      if (!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({
      text,
      user_id,
    });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages);
  });
});

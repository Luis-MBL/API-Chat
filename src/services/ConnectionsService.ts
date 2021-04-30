import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { Message } from '../entities/Message';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IRequest {
  admin_id?: string;
  socket_id: string;
  user_id: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({
    admin_id,
    socket_id,
    user_id,
  }: IRequest): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      admin_id,
      socket_id,
      user_id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
}

export { ConnectionsService };

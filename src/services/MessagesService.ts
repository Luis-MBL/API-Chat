import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessagesService {
  async create({ admin_id, text, user_id }: IRequest): Promise<Message> {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await messagesRepository.save(message);

    return message;
  }
  async listByUser(user_id: string): Promise<Message[]> {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const messages = await messagesRepository.find({
      user_id,
    });

    return messages;
  }
}

export { MessagesService };

import { getCustomRepository, IsNull, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { Message } from '../entities/Message';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IRequest {
  admin_id?: string;
  socket_id: string;
  user_id: string;
  id?: string;
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
    id,
  }: IRequest): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      id,
      admin_id,
      socket_id,
      user_id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }
  async findByUserId(user_id): Promise<Connection | undefined> {
    const connection = this.connectionsRepository.findOne({ user_id });

    return connection;
  }
  async findAllWithoutAdmin(): Promise<Connection[]> {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: IsNull() },
      relations: ['user'],
    });
    return connections;
  }
  async findBySocketId(socket_id: string): Promise<Connection> {
    const connections = await this.connectionsRepository.findOne({ socket_id });
    return connections;
  }
}

export { ConnectionsService };

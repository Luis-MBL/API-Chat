import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface IRequest {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({ chat, username }: IRequest): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const setting = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(setting);

    return setting;
  }
  async findByUsername(username: string): Promise<Setting | undefined> {
    const settings = await this.settingsRepository.findOne({ username });
    return settings;
  }
}

export { SettingsService };

import { getCustomRepository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface IRequest {
  chat: boolean;
  username: string;
}

class SettingsService {
  async create({ chat, username }: IRequest): Promise<Setting> {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const setting = settingsRepository.create({
      chat,
      username,
    });

    await settingsRepository.save(setting);

    return setting;
  }
}

export { SettingsService };

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from './repositories/SettingsRepository';

const routes = Router();

routes.post('/settings', async (request, response) => {
  const { chat, username } = request.body;

  const settingsRepository = getCustomRepository(SettingsRepository);

  const setting = settingsRepository.create({
    chat,
    username,
  });

  await settingsRepository.save(setting);

  response.json(setting);
});

export { routes };

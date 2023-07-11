import { createApplication } from './app.utils';
import { configuration } from './common';

async function bootstrap() {
  const app = await createApplication();

  const PORT = configuration().serverPort;

  await app
    .listen(PORT, '0.0.0.0')
    .then(() => console.log(`Server start with port ${PORT}`));
}

(async () => {
  await bootstrap();
})();

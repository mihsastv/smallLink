import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {SwaggerStart} from "./swagger/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";
import configuration from "./config/configuration";
import { join } from 'path';

async function bootstrap() {
    const logger = new Logger('APPStart')
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
    const port = configuration().serverPort;
    app.setBaseViewsDir(join(__dirname, '../../', 'views'));
    app.setViewEngine('hbs');

    if (!configuration().isProduct) {
        SwaggerStart(app)
    }
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, () => {
        logger.log('Server listening at http://localhost:' + port + '/');
    });
}

bootstrap();

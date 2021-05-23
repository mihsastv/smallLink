import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {SwaggerStart} from "./swagger/swagger";
import {Logger, ValidationPipe} from "@nestjs/common";
import configuration from "./config/configuration";
import { join } from 'path';
const logger = new Logger('APPStart')

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
    const port = configuration().serverPort;
    app.setBaseViewsDir(join(__dirname, '../../', 'views'));
    app.setViewEngine('hbs');

    if (!configuration().isProduct) {
        SwaggerStart(app)
    }
    app.useGlobalPipes(new ValidationPipe());
    logger.log(__dirname + '/../entity/link.entity{.ts,.js}');
    await app.listen(port, () => {
        logger.log('Server listening at http://localhost:' + port + '/');
    });
}

bootstrap().catch(e => logger.error(e));

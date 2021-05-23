import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {LinkModifyModule} from './link-modify/link-modify.module';
import {ConnectionModule} from "./connection/connection.module";
import configuration from "./config/configuration";
import {AppController} from "./app.controller";


@Module({
    imports: [ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true
    }),
        LinkModifyModule,
        ConnectionModule],
    providers: [AppService],
    controllers: [AppController],
})
export class AppModule {
}

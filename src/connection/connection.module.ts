import {Module} from "@nestjs/common";
import {PgConnection} from "./pg.connection";

@Module({
    providers: [PgConnection],
    exports: [PgConnection]
})
export class ConnectionModule {
}

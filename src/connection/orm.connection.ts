import {Connection, createConnection} from "typeorm";
import {PG_ORM} from "../common/common.const";
import configuration from "../config/configuration";

export const ORM_CONNECTION = {
    provide: PG_ORM,
    useFactory: async () => await createConnection(
        configuration().postgresOrm
    )
}

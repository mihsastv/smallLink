import {Connection} from "typeorm";
import {LINK_REPOSITORY, PG_ORM} from "../common/common.const";
import {Link} from "../entity/link.entity";

export const LINK_REPO =
    {
        provide: LINK_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Link),
        inject: [PG_ORM],
    }

import {Module} from '@nestjs/common';
import {LinkModifyController} from './link-modify.controller';
import {LinkModifyService} from './link-modify.service';
import {LinkModifyQueryService} from "./link-modify.query.service";
import {ConnectionModule} from "../connection/connection.module";
import {LinkModifyOrmService} from "./link-modify.orm.service";
import {LINK_REPO} from "../repository/link.repository";
import {ORM_CONNECTION} from "../connection/orm.connection";

@Module({
    imports: [ConnectionModule],
    controllers: [LinkModifyController],
    providers: [LinkModifyService,
        LinkModifyQueryService,
        LinkModifyOrmService,
        ORM_CONNECTION,
        LINK_REPO
    ]
})
export class LinkModifyModule {
}

import {Inject, Injectable, Logger} from "@nestjs/common";
import {PgConnection} from "../connection/pg.connection";

@Injectable()

export class LinkModifyQueryService {
    @Inject()
    private readonly pg: PgConnection;

    saveNewLink (originalUrl: string, smallUrl: string) {
        return this.pg.edit(`insert into link (original_url, small_url) values 
                                                  ('${originalUrl}', '${smallUrl}')`)
    }

    checkLink (link: string): Promise<{smallUrl: string} | null> {
       return this.pg.row(`select small_url as "smallUrl" 
                from link where original_url = '${link}'`, [])
    }

    getFullLink (smallLink: string): Promise<{originalUrl: string} | null> {
       return this.pg.row(`select original_url as "originalUrl" 
                from link where small_url = '${smallLink}'`, [])
    }

    deleteLink (smallLink: string): Promise<{command: string, rowCount: number}> {
       return this.pg.edit(`delete from link where small_url = '${smallLink}'`)
    }
}

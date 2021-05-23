import {Inject, Injectable, Logger} from '@nestjs/common';
import {Pool} from 'pg';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PgConnection {
    constructor (private cfg: ConfigService){};
    private logger = new Logger(PgConnection.name)
    private pool = new Pool({connectionString: this.cfg.get('postgresUrl')});


    async query(text: any, params: any): Promise<any> {
        return await this.pool.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows : {result: true})
            .catch((e) => {
                this.logger.error(e)
            });
    }

    async rows(text: any, params: any): Promise<any> {
        return await this.pool.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows : [])
            .catch((e) => {
                this.logger.error(e)
            });
    }

    async row(text: any, params: any): Promise<any> {
        return await this.pool.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows[0] : null)
            .catch((e) => {
                this.logger.error(e)
            });
    }

    async edit(query) {
        return await this.pool.query(
            query, []
        ).then(queryResult => {
            return {command: queryResult?.command, rowCount: queryResult?.rowCount}
        }).catch((e) => {
                this.logger.error(e)
                return {command: 'error', rowCount: 0}
            });
    }
}

import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Pool} from 'pg';

@Injectable()
export class PgsqlService {
  constructor(public cgf: ConfigService) { }

    private pool = new Pool({connectionString:  this.cgf.get('postgreSqlCfg.url')});

    async query (text: any, params: any):Promise<any> {
        return await this.pool.query(text, params)
        .then(
            res => res.rows.length !== 0 ? res.rows : {result: true})
        .catch(
            e => console.log(e)
        );
    }

    async rows (text: any, params: any):Promise<any> {
        return await this.pool.query(text, params)
        .then(
            res => res.rows.length !== 0 ? res.rows : [])
        .catch(
            e => console.log(e)
        );
    }

    async row (text: any, params: any):Promise<any> {
        return await this.pool.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows[0] : null)
            .catch(
                e => console.log(e)
            );
    }

    async edit(query) {
        const queryResult = await this.pool.query(
            query, []
        ).catch((e) => {
            throw e;
        });
        return {command: queryResult.command, rowCount: queryResult.rowCount};
    }

    async getConfig (p: {config_group: string, config_type: string, config_ident: string}) {
        const getParams =  await this.query(`select config_value from mta_config where config_group = \'${p.config_group}\'
        and config_type = \'${p.config_type}\' 
        and config_ident = \'${p.config_ident}\'`, []);
        if (!getParams?.result) {
            return getParams[0].config_value;
        } else {return {error: 'Parameter not found'}}

    }

    private pool_customer = new Pool({connectionString:  this.cgf.get('postgreSqlCfg.url_customer')});

    async query_c (text: any, params: any) {
        return await this.pool_customer.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows : {result: true})
            .catch(
                e => e
            );
    }

    async row_c (text: any, params: any):Promise<any> {
        return await this.pool_customer.query(text, params)
            .then(
                res => res.rows.length !== 0 ? res.rows[0] : null)
            .catch(
                e => console.log(e)
            );
    }
}

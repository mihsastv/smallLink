/* eslint-disable @typescript-eslint/camelcase */

import {ConnectionOptions} from "typeorm";

export default (): ConfigInterface => ({
    isProduct: process.env.IS_PRODUCT === 'true',
    serverPort: process.env.SERVER_PORT || 3333,
    postgresUrl: process.env.DATABASE_URL || 'postgresql://postgres:secret@localhost:5432/medteh',
    globalUrl: process.env.GLOBAL_URL || 'http://localhost:3333',
    postgresOrm:  {
        name: 'connection',
        type: 'postgres',
        host: process.env.ORM_HOST || 'localhost',
        port: parseInt(process.env.ORM_PORT) || 5432,
        username: process.env.ORM_USERNAME || 'postgres',
        password:  process.env.ORM_PASSWORD ||'secret',
        database: process.env.ORM_DATABASE || 'medteh',
        entities: [
            __dirname + '/../../**/*.entity{.ts,.js}',
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
    }
});

interface ConfigInterface {
    postgresOrm: ConnectionOptions,
   [key: string]: any;
}

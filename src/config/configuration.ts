/* eslint-disable @typescript-eslint/camelcase */
export default () => ({
    isProduct: process.env.IS_PRODUCT === 'true',
    port: process.env.SERVER_PORT || 3333,
    mongo: {
        MONGODB_CRM_URL: process.env.CRM_MONGO_URL || 'mongodb://192.168.100.7:27017',
        MONGO_CRM_BASE:  process.env.CRM_MONGO_DB || 'hyundaimobility_test',
        MONGODB_MTA_URL: 'mongodb://192.168.100.7:27017',
        MONGO_MTA_BASE: 'mta_logs'
    },

    postgreSqlCfg:  {
        url: process.env.PGSQL,
        url_customer: process.env.PGSQL_CUSTOMER
    },

    tcp: {
        host: process.env.TCP || '192.168.100.13',
        port: process.env.TCP_PORT || 9010,
        pwd: process.env.TCP_PWD || 'zafer'
    },

    ttriCod: process.env.TTRI_CHECK_CODE || 'test_code_for_device'
});

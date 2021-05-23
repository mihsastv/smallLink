/* eslint-disable @typescript-eslint/camelcase */
import {MigrationBuilder, ColumnDefinitions} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        create table link
        (
            original_url varchar not null,
            small_url    varchar not null
        );

        create
        unique index link_original_url_uindex
        on link (original_url);

        create
        unique index link_small_url_uindex
        on link (small_url);
        CREATE SCHEMA IF NOT EXISTS audit;
        CREATE TABLE audit.link as select 'D' as operation, now() as stamp, 'fake' as userid, * from link limit 0;

        CREATE OR REPLACE FUNCTION process_link_audit() RETURNS TRIGGER AS $link_audit$
        BEGIN
        --
        -- Добавление строки в emp_audit, которая отражает операцию, выполняемую в emp;
        -- для определения типа операции применяется специальная переменная TG_OP.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO audit.link SELECT 'D', now(), user, OLD.*;
        RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO audit.link SELECT 'U', now(), user, NEW.*;
        RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO audit.link SELECT 'I', now(), user, NEW.*;
        RETURN NEW;
        END IF;
        RETURN NULL; -- возвращаемое значение для триггера AFTER игнорируется
        END;
        $link_audit$ LANGUAGE plpgsql;

        CREATE TRIGGER link_audit
            AFTER INSERT OR UPDATE OR DELETE ON link
            FOR EACH ROW EXECUTE PROCEDURE process_link_audit();
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(` DROP TRIGGER IF EXISTS link_audit on link ;
                    DROP FUNCTION IF EXISTS process_link_audit;
                    DROP TABLE IF EXISTS audit.link;
                    DROP TABLE IF EXISTS link;`);
}

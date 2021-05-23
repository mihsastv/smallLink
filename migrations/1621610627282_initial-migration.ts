/* eslint-disable @typescript-eslint/camelcase */
import {MigrationBuilder, ColumnDefinitions} from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        create table link
        (
            original_url varchar not null,
            small_url    varchar not null,
            created_at   int default extract(epoch from now())
        );

        create
        unique index link_original_url_uindex
        on link (original_url);

        create
        unique index link_small_url_uindex
        on link (small_url);
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`drop table link`);
}

import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class LinkEntity {

    @Column({nullable: false})
    originalUrl: string;

    @PrimaryColumn("varchar", {nullable: false})
    smallUrl: string;

    @Column('int', {default: Date.now()})
    createdAt: number;
}

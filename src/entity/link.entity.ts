import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Link {

    @Column({nullable: false})
    original_url: string;

    @PrimaryColumn("varchar", {nullable: false})
    small_url: string;
}

/* eslint-disable */
import {Inject, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {Link} from "../entity/link.entity";
import {LINK_REPOSITORY} from "../common/common.const";

@Injectable()
export class LinkModifyOrmService {
    private logger = new Logger(LinkModifyOrmService.name)

    constructor(
        @Inject(LINK_REPOSITORY)
        private linkEntityRepository: Repository<Link>,
    ) {
    }

    async saveNewLink(originalUrl: string, smallUrl: string): Promise<{rowCount: number}> {
        const resInsert = await this.linkEntityRepository.createQueryBuilder("link")
            .createQueryBuilder()
            .insert()
            .into('link')
            .values([
                {original_url: originalUrl, small_url: smallUrl},
            ])
            .execute()
            .catch(e => {
                this.logger.error(e);
                return null
            });
        return resInsert ? {rowCount: 1} : {rowCount: 0}
    }

    checkLink(link: string): Promise<{ smallUrl: string } | any> {
        const res = this.linkEntityRepository.createQueryBuilder("link")
            .where("link.original_url = :link", {link})
            .getOne()
            .catch(e => {
                this.logger.error(e);
                return null
            });
        return res.then(data => data ? {smallUrl: data.small_url} : null);

    }

    async getFullLink(smallLink: string): Promise<{ originalUrl: string } | null> {
        const selectRes = await this.linkEntityRepository.createQueryBuilder("link")
            .where("link.small_url = :smallLink", {smallLink})
            .getOne()
            .catch(e => {
                this.logger.error(e);
                return null
            });
        return selectRes ? {originalUrl: selectRes.original_url} : null;
    }

    async deleteLink(smallLink: string): Promise<{ command: string, rowCount: number }> {
        const delPromise = await this.linkEntityRepository.createQueryBuilder()
            .delete()
            .from('link')
            .where("small_url = :id", {id: smallLink})
            .execute()
            .catch(e => {
                this.logger.error(e);
                return {affected: 0}
            });
        return {command: 'delete', rowCount: delPromise?.affected};
    }

}

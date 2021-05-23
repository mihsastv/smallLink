import {Inject, Injectable} from '@nestjs/common';
import {createCipheriv, randomBytes, scrypt} from 'crypto';
import {promisify} from 'util';
import {LinkModifyQueryService} from './link-modify.query.service';
import {ResultInterface} from '../common/common.interface';
import {ConfigService} from '@nestjs/config';
import {LinkModifyOrmService} from "./link-modify.orm.service";

@Injectable()
export class LinkModifyService {
    constructor(private cfg: ConfigService) {
    }

    private globalUrl = this.cfg.get('globalUrl')
    @Inject() private readonly linkModifyQueryService: LinkModifyQueryService
    @Inject() private readonly linkModifyOrmService: LinkModifyOrmService


    async redirectLink(smallUrl: string, orm?: boolean): Promise<string> {
        const fullUrl = orm ? await this.linkModifyOrmService.getFullLink(smallUrl) :
            await this.linkModifyQueryService.getFullLink(smallUrl);

        return fullUrl?.originalUrl ?
            fullUrl?.originalUrl :
            `${this.globalUrl}/api/${smallUrl}`;
    }

    async createLink(link: string, orm?: boolean): Promise<ResultInterface> {
        const checkLink = orm ? await this.linkModifyOrmService.checkLink(link) :
            await this.linkModifyQueryService.checkLink(link);
        if (checkLink) {
            return {
                result: 'success',
                smallUrl: `${this.globalUrl}/${checkLink.smallUrl}`
            }
        }
        const smallLink = await this.encodeLink();

        const resInsert = orm ?
            await this.linkModifyOrmService.saveNewLink(link, smallLink) :
            await this.linkModifyQueryService.saveNewLink(link, smallLink);

        return resInsert?.rowCount ? {
            result: 'success',
            smallUrl: `${this.globalUrl}/${smallLink}`
        } : {
            result: 'error',
            message: `Create small link failed`
        };
    }

    async deleteLink(smallUrl: string, orm?: boolean): Promise<ResultInterface> {
        const deleteLink = orm ?
            await this.linkModifyOrmService.deleteLink(smallUrl) :
            await this.linkModifyQueryService.deleteLink(smallUrl);
        return deleteLink?.rowCount ? {
            result: 'success',
            message: 'modified link removed'
        } : {
            result: 'error',
            message: 'modified link not found'
        };
    }

    async encodeLink(): Promise<string> {
        const iv = randomBytes(16);
        const password = 'Secret-key-for';
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const textToEncrypt = (Math.ceil(Date.now() / 1000)).toString();
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return encryptedText.toString('hex');
    }

}

import {Inject, Injectable, Logger} from '@nestjs/common';
import {createCipheriv, randomBytes, scrypt} from 'crypto';
import {promisify} from 'util';
import {LinkModifyQueryService} from './link-modify.query.service';
import {ResultInterface} from '../common/common.interface';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class LinkModifyService {
    constructor(private cfg: ConfigService) {}

    private logger = new Logger(LinkModifyService.name)
    private globalUrl = this.cfg.get('globalUrl')
    @Inject() private readonly linkModifyQueryService: LinkModifyQueryService


    async redirectLink(smallUrl: string): Promise<string> {
        const fullUrl = await this.linkModifyQueryService.getFullLink(smallUrl);
        return fullUrl?.originalUrl ? fullUrl?.originalUrl : `${this.globalUrl}/api/${smallUrl}`;
    }

    async createLink(link: string): Promise<ResultInterface> {
        const checkLink = await this.linkModifyQueryService.checkLink(link)
        if (checkLink) {
            return {
                result: 'success' ,
                smallUrl: `${this.globalUrl}/${checkLink.smallUrl}`
            }
        }
        const smallLink = await this.encodeLink();
        this.linkModifyQueryService.saveNewLink(link, smallLink);
        return  {
            result: 'success' ,
            smallUrl: `${this.globalUrl}/${smallLink}`
        };
    }

    async deleteLink(smallUrl: string): Promise<ResultInterface> {
        const deleteLink = await this.linkModifyQueryService.deleteLink(smallUrl);
        if (deleteLink?.rowCount) {
            return {
                result: 'success',
                message: 'modified link removed'
            }
        }
        return {
            result: 'error',
            message: 'modified link not found'
        };
    }

    async encodeLink(): Promise<string> {
        const iv = randomBytes(16);
        const password = 'Secret-key-for';
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const textToEncrypt = (Math.ceil(Date.now()/1000)).toString();
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return encryptedText.toString('hex');
    }

}

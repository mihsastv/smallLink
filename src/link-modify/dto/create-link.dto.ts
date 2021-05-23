/* eslint-disable */
import { IsUrl } from 'class-validator';

export class CreateLinkDto {
    @IsUrl({
        require_tld: false,
        require_protocol: true,
    })
    link: string;
}

import { Length, IsString} from 'class-validator';

export class LinkValidDto {
    constructor(linkId: string) {
        this.linkId = linkId;
    }
    @Length(20, 20)
    @IsString()
    linkId: string
}

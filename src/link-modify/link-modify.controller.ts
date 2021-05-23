import {Body, Controller, Delete, Get, Header, Inject, Logger, Param, Post, Query, Req, Res} from '@nestjs/common';
import {LinkModifyService} from './link-modify.service';
import {ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ResultInterface} from '../common/common.interface';
import {CreateLinkDto} from './dto/create-link.dto';
import {LinkValidDto} from './dto/link-valid.dto';
import {validate} from 'class-validator';
import {checkError} from '../common/common.functions';

@ApiTags('link-modify')
@ApiHeader({
    name: 'base',
    required: false,
    example: 'orm',
    description: 'По умолчанию соединение с базой PgConnect, если указать orm, то TypeOrm'
})

@Controller()
export class LinkModifyController {

    logger = new Logger(LinkModifyController.name)
    @Inject() private readonly linkModifyService: LinkModifyService;

    @Get(':linkId')
    @ApiOperation({summary: 'Переадресация по коротокой ссылке'})
    @ApiParam({
        name: 'linkId',
        type: 'string',
        description: 'Id короткой ссылки',
        example: '742cd90145fc962bbef6'
    })
    async redirectLink(
        @Param('linkId') linkId: string,
        @Req() req,
        @Res() res,
    ) {
        const errors = await validate(new LinkValidDto(linkId));
        checkError(errors);
        const fullUrl = await this.linkModifyService.redirectLink(linkId, this.getHeaderBase(req));
        this.logger.log(`redirect small ${linkId} url to ${fullUrl}`);
        res.redirect(fullUrl);
    }

    @Post('create')
    @ApiOperation({summary: 'Создать короткую ссылку'})
    @ApiBody({
        schema: {
            type: 'string',
            description: 'Ссылка для преобразования',
            example: {link: 'https://ru.wikipedia.org/wiki/PostgreSQL'}
        }

    })
    @ApiResponse({
        status: 201,
        description: 'The small link has been successfully created.',
        schema: {
            example: {
                result: 'success',
                smallUrl: 'http://localhost:3333/link/2f8043fbb6e7f261e52a'
            },
        },
    })
    createLink(@Body() body: CreateLinkDto,
               @Req() req,
    ): Promise<ResultInterface> {
        this.logger.log(`Create small link for ${body.link}`);
        return this.linkModifyService.createLink(body.link, this.getHeaderBase(req));
    }

    @Delete(':linkId')
    @ApiOperation({summary: 'Удалить ссылку'})
    @ApiParam({
        name: 'linkId',
        type: 'string',
        description: 'Id короткой ссылки',
        example: '742cd90145fc962bbef6'
    })
    @ApiResponse({
        status: 201,
        description: 'The small link has been deleted.',
        schema: {
            example: {
                result: 'success',
                message: 'modified link removed'
            },
        },
    })
    async deleteLink(
        @Param('linkId') linkId: string,
        @Req() req,
    ): Promise<ResultInterface> {
        const errors = await validate(new LinkValidDto(linkId));
        checkError(errors);
        this.logger.log(`Deleted small link ${linkId}`);
        return this.linkModifyService.deleteLink(linkId, this.getHeaderBase(req));
    }

    getHeaderBase(req) {
        return req?.headers?.base === 'orm'
    }
}

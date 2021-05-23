import {Test, TestingModule} from '@nestjs/testing';
import {LinkModifyService} from './link-modify.service';
import {ConfigService} from "@nestjs/config";
import {LinkModifyQueryService} from "./link-modify.query.service";
import {PgConnection} from "../connection/pg.connection";
import {LinkModifyOrmService} from "./link-modify.orm.service";
import {ORM_CONNECTION} from "../connection/orm.connection";
import {LINK_REPO} from "../repository/link.repository";
import {LinkModifyController} from "./link-modify.controller";
import {ResultInterface} from "../common/common.interface";

describe('LinkModify', () => {
    let linkService: LinkModifyService;
    let linkController: LinkModifyController;
    let linkQueryService: LinkModifyQueryService;
    let linkOrmService: LinkModifyOrmService;


    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LinkModifyService,
                ConfigService,
                LinkModifyQueryService,
                PgConnection,
                LinkModifyOrmService,
                ORM_CONNECTION,
                LINK_REPO
            ],
            controllers: [
                LinkModifyController
            ]
        }).compile();

        linkService = module.get<LinkModifyService>(LinkModifyService);
        linkController = module.get<LinkModifyController>(LinkModifyController);
        linkQueryService = module.get<LinkModifyQueryService>(LinkModifyQueryService);
        linkOrmService = module.get<LinkModifyOrmService>(LinkModifyOrmService);
    });

    it('should be defined', () => {
        expect(linkService).toBeDefined();
        expect(linkController).toBeDefined();
        expect(linkQueryService).toBeDefined();
        expect(linkOrmService).toBeDefined();
        expect(linkOrmService.deleteLink).toBeDefined();
    });

    describe('linkController with linkService', () => {
        it('should return result createLink', async () => {
            const result: ResultInterface = {result: 'success', smallUrl: 'http://localhost/test'}
            const resultPromise = new Promise<ResultInterface>(resolve => resolve(result));
            jest.spyOn(linkService, 'createLink').mockImplementation(() => resultPromise.then(res => res));
            expect(await linkController.createLink({link: 'https://test.test'})).toEqual(result);
        });

        it('should return result encodeLink', async () => {
            expect(await linkService.encodeLink()).toHaveLength(20);
        });

        it('should return result deleteLink', async () => {
            const result: ResultInterface = {result: 'error', message: 'modified link not found'}
            const resultPromise = new Promise<ResultInterface>(resolve => resolve(result));
            jest.spyOn(linkService, 'deleteLink').mockImplementation(() => resultPromise.then(res => res));
            expect(await linkController.deleteLink('qweasdzxcqrtyfghvbnr')).toEqual(result);
        });

        it('should return result redirectLink', async () => {
            expect(await linkService.redirectLink('qweasdzxcqrtyfghvbnr')).toBeTruthy();
        });

    });
});

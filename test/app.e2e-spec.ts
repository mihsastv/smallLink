import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {LinkModifyModule} from "../src/link-modify/link-modify.module";
import {AppModule} from "../src/app.module";

describe('LinkModifyController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, LinkModifyModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ delete small link', () => {
    return request(app.getHttpServer())
      .delete('/testTESTtestTESTtest')
      .expect(200)
      .expect({
        "result": "error",
        "message": "modified link not found"
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

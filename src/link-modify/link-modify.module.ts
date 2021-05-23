import { Module } from '@nestjs/common';
import { LinkModifyController } from './link-modify.controller';
import { LinkModifyService } from './link-modify.service';

@Module({
  controllers: [LinkModifyController],
  providers: [LinkModifyService]
})
export class LinkModifyModule {}

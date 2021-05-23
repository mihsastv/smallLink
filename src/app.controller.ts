import {Controller, Get, Param, Render} from "@nestjs/common";

@Controller('api')
export class AppController {
    @Get(':link')
    @Render('index')
    linkNotFound (@Param('link') link: string) {
        return {link: `Короткая ссылка ${link} не найдена`};
    }
}

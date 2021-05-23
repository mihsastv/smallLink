import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MED TEST')
    .setDescription(`# The client service API documentation`)
    .setVersion('1.0')
    .addTag('LOGS')
    .build()

export function SwaggerStart(app: any) {
    const doc = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api-doc', app, doc);
}

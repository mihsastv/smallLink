<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Описание задания

Тестовое задание:

Сделать сервис для сокращения ссылок(аналог bit.ly). Необходимо реализовать только REST API для этого сервиса.

Что должен уметь сервис:
• создавать короткие ссылки, т.е. пользователь передает сервису ссылку, сервис генерирует короткую ссылку и возвращает ее пользователю
• сервис осуществляет переход по ранее созданной ссылке

Нас не интересует авторизация, аккаунтинг и сбор статистики переходов.

Стэк технологий:
• Фреймворк NestJS
• Остальное по выбору, но нужно кратко описать,
почему была выбрана та или иная технология

## Описание выполнения

В качестве хранения используется база Postres, 
   для подключения без ORM используется http://github.com/brianc/node-postgres используется по умолчанию
или подкючения с использованием TypeOrm https://typeorm.io/, 
для переключения достаточно указать в Header base: orm
Для логирования действий с таблицей используется audit схема postgres 
стандартными методами. 

Документирование API c использованием Swagger

Короткие ссылки формируются шифрованием (bcrypt) текущей даты в unix формате


## Platform
>* Postres (Для запуска необходим сервер, для разработки можно использовать 
   > docker-compose.yml из корня проекта)
>* NodeJs
>* NestJs

## Пример ENV файла
Указанные параметры используются по умолчанию
! Обязательный параметр в окружении DATABASE_URL, нужен для миграций

````dotenv
SERVER_PORT = 3333 
DATABASE_URL='postgresql://postgres:secret@localhost:5432/medteh'

##POSTGRES_ORM
ORM_HOST = 'localhost'
ORM_PORT = 5432
ORM_USERNAME = 'postgres'
ORM_PASSWORD = 'secret'
ORM_DATABASE = 'medteh'
ORM_ENTITIES ='/../../**/*.entity{.ts,.js}'
````

## Installation
Для локальной установки postgres требуется
установка 
docker-compose https://docs.docker.com/compose/install/

Также необходимо установить

node js https://nodejs.org/en/download/

nest js https://docs.nestjs.com/

После установки из корня проекта выполнить 
``` shell script
$ docker-composer up 
```
После этого 

``` shell script
$ npm install
```

### Первоначальное развертывание базы

Принять все миграции
для подключения используется DATABASE_URL из окружения

````shell script
$ npm run migrate up 
````

## Запуск приложения

```bash

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Swagger 
При запущеном сервере в дев режиме

http://localhost:3333/api-doc

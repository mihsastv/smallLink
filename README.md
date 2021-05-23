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

В качестве хранения используется база Postres


## Platform
>* Postres (Для запуска необходим сервер, для разработки можно использовать 
   > docker-compose.yml из корня проекта)
>* NodeJs
>* NestJs

## Пример ENV файла
Указанные параметры используются по умолчанию

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

```bash
$ npm install
```

### Первоначальное развертывание базы

Принять все миграции
для подключения используется DATABASE_URL из окружения

````shell script
    yarn run migrate up 
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

# test coverage
$ npm run test:cov
```

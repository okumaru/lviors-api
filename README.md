[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  

## Description

Example project from L`viors build with 

- [Nest](https://github.com/nestjs/nest) framework.
- [Prisma](https://github.com/prisma/prisma) ORM (Mysql/MariaDB Provider).
- [Swagger](https://github.com/nestjs/swagger) Documentation.
- TypeScript.

## Env Variable
```
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
```

## Getting Started

1. Install dependency
```bash
$ npm install
```

2. Migrate database schema
```bash
$ npx prisma migrate dev
```

3. Generate prisma schema
```bash
$ npx prisma generate
```

4. Start API locally
```bash
$ npm run start:dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

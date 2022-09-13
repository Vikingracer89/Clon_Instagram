# API Clon de Instagram

Este ejercicio consiste en crear una API que simule el funcionamiento de una aplicación similar a Instagram.

La base de datos se crea usando querys de MySQL

## Entidades

- User:
  - id
  - email
  - password
  - created_at
- Photo:
  - id
  - user
  - text (opcional)
  - image
  - created_at

## Endpoints

- **POST /user** Registro de usuario ✅
- **GET /user/:id** Devuelve información de usuario ✅
- **POST /login** Login de usuario (devuelve token) ✅
- **POST /** Permite crear un post(necesita cabecera con token) ✅
- **GET /** Lista todos los post ✅
- **GET /photo/:id** Deveuelve un post ✅
- **DELETE /photo/:id** Borra una post sólo si eres quien lo creó ✅

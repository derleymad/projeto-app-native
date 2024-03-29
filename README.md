
# Aplicativo Curativar

## Navegue aqui :3

* [To do](#to-do)
* [Informações gerais](#informações-gerais)
* [Capturas de tela](#screenshots)
* [Tecnologias](#tecnologia)
* [Setup](#setup)
* [License](#license)

## Informações gerais

Este projeto foi feito em React Native, usando TypeScript para desenvolver um applicativo mobile híbrido para a clínica, esta que será usada em beneficio de médicos e enfermeiros para postagem e interações de enfermidades.

## To do

- [ ] Splash Screen
- [x] CRIAÇÃO DE CONTA
- [x] LOGIN
- [x] CRIAR POST
- [x] POST / COMENTÁRIOS
- [x] INTERAÇÕES
- [x] FEED
- [x] EDIÇÃO USUÁRIO
- [x] PERFIL
- [x] TEMAS
- [x] API-Básica de títulos, descrição, imagens com o strap
- [x] Consumir API-Básica.

## Screenshots

<p float="left">
 <img src="images/Cadastro.gif" width="200" />
  <img src="images/CriarPost.gif" width="200" /> 
  <img src="images/Feed.gif" width="200" />
  <img src="images/Comentarios.gif" width="200" />
  <img src="images/Temas.gif" width="200" />
</p>

## Tecnologias
#### Linguagens:

- React Native 
- Typescrit

#### Libraries:
* [Para mais informações](https://github.com/derleymad/projeto-app-native/blob/main/curativar/package.json)

## Setup

Para rodar esse projeto, instale-o baixando ou clonando o repositório e execute os comandos:
```cmd
cd curativar && sudo npm install
```
Logo em seguida inicie o projeto: 
```cmd
npx react-native start
```

### Configurarando o Strapi
#### Requisitos
- Docker e Docker Compose
- Criar o .env na pasta /strapi e preencher de acordo com [.env.example](https://github.com/derleymad/projeto-app-native/blob/main/strapi/.env.example)

#### Iniciando o strapi
```cmd
cd strapi
docker-compose up -d
```

#### Importando o banco de dados (mariadb/mysql) para o container
```cmd
docker-compose exec strapiDB bash
mysql -u nomeUsuario -psenha nomeBancoDeDados < mobile.sql
```

#### Requisitos do sistema 
- Ter um computador
- Npm v. > 9.5.1

## Licença

```html
MIT Licence 

Copyright (c) 2023 Nois3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

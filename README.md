# Get a Diet API

##  Visão Geral

Essa é uma API desenvolvida em NodeJs com TypeScript sob os requisitos do app de acompanhamento nutricional Get a Diet.

## Rotas 

As rotas protegidas usam token JWT como autorização e as requisições devem possuir o cabeçalho `Authorization`.

### Autenticação

`POST` `/users`

Rota para criação de usuários, as requisições devem conter um body com um objeto contendo informações do usuário.

Por exemplo: 
```javascript
{
    name: "John Doe",
    email: "johndoe@example.com",
    password: "123456",
    crn: "0000000",
}
```

`POST` `/sessions`

Rota para autenticar o usuário, as requisições devem conter um body com um objeto contendo informação de login do usuário.

Por exemplo: 
```javascript
{
    email: "johndoe@example.com",
    password: "123456",
}
```

`PATCH` `/token/refresh`

Rota para gerar um novo access token, as requisições não necessitam de um body.

### Informação do Usuario

`GET` `/me`

Rota de retorno de informações do usuário, essa rota é protegida e as requisições devem conter o cabeçalho `Authorization` com o access token.

`POST` `/verify/crn`

Rota para verificar se um crn fornecido é valido, as requisições devem conter um body com um objeto contendo o CRN que será consultado.

Por exemplo: 
```javascript
{
    crn: '123456',
}
```

### Gerenciamento das dietas

`POST` `/diets`

Rota para criação de dietas, essa rota é protegida e as requisições devem conter o cabeçalho `Authorization` com o access token e um body com um objeto contendo informações da dieta.

Por exemplo: 
```javascript
{
      title: 'Cutting',
      meals: [
        {
          title: 'Café da manhã',
          items: [
            { name: 'Pão', quantity: 2, unit: 'Un', description: null },
            {
              name: 'Ovo mexido',
              quantity: 2,
              unit: 'Un',
              description: null,
            },
          ],
          completed: null,
        },
        {
          title: 'Almoço',
          items: [
            { name: 'Arroz', quantity: 100, unit: 'Gr', description: null },
            { name: 'Feijão', quantity: 50, unit: 'Gr', description: null },
            {
              name: 'Frango',
              quantity: 100,
              unit: 'Gr',
              description: 'Pode ser substituido por carne magra ou 2 ovos',
            },
          ],
          completed: null,
        },
      ],
      author_id: user.id,
    }
```

`PATCH` `/meal/markcompleted`

Rota para marcar uma refeição como concluída, essa rota é protegida e as requisições devem conter o cabeçalho `Authorization` com o access token e um body com um objeto contendo o titulo da refeição que será atualizada.

Por exemplo: 
```javascript
{
    title: 'Almoço',
}
```

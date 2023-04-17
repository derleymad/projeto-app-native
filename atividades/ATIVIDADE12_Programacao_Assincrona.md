# Programação Assíncrona

## Fundamentos de programação assíncrona

A programação assíncrona é uma técnica utilizada para prevenir atrasos ou períodos de espera no decorrer de um programa. Em situações em que executamos tarefas de forma sincronizada, podemos nos deparar com obstáculos que impedem a continuação do processo enquanto esperamos a finalização da execução de determinado trecho de código. Isso pode levar a uma paralisação completa do programa até que o passo em questão seja concluído.

## Como usar em Javascript

Em Javascript a forma mais utilizada atualmente é com async await, mas anteriormente e ainda hoje em alguns casos é utilizado Promises e callback.
- Exemplos de uso para async await:
```ts
  async function getUser(userId: number) {
    try {
      const response = await fetch(`https://algumaapi.com/user/${userId}`);
      const data = await response.json();
      return data;
    } catch(error: any) {
      console.error(error);
    }
  }
```
Essa mesma função utilizando Promise:
```ts
  function getUser(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`https://algumaapi.com/user/${userId}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(erro => reject(error));
    });
  }

  getUser(12)
    .then(user => console.log(user))
    .catch(error => console.error(error));
```
## Qual a importância do assunto para o desenvolvimento do seu projeto em React Native

Funções assíncronas são importantes pois elas irão fazer tarefas que podem ser demoradas sem que a aplicação fique travada.
Para o nosso caso de uso, ela será fundamental para a busca de informações de usuário e busca de posts(imagens), além do uso
para a criação e login de conta.

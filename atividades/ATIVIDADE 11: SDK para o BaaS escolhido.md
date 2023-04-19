
## Adicionando o Back4App ao seu projeto

#### Compatibilidade com tecnologias
O SDK Parse está disponível nas principais tecnologias de front-end, incluindo: JavaScript(ReactJS, React Native, AngularJS, VueJS, NodeJS), iOS(ObjectiveC/Swift, Android(Java/Kotlin), Flutter, PHP, .NET/Xamarin , Unity, Embedded C. 

Para conectar-se aos servidores do Back4App. Você terá que instalar o SDK e inicializar seu projeto de aplicativo usando a API Back4App e suas chaves.

#### Pré-requisitos
Para concluir este tutorial, você precisará de:
- Um ambiente de projeto de software aplicativo pronto para uso.
- Encontre as keys do aplicativo em Core Settings, vá para *Server Settings > Core Settings > Settings > App Id and other*.

#### Etapa 1 - Crie seu aplicativo no Back4App
Se você ainda não tem um App no ​​Back4App, dê uma olhada em [como criar seu primeiro App Back4App](https://www.back4app.com/docs/get-started/new-parse-app).

Neste guia, você será capaz de se conectar e enviar sua primeira chamada de API para Back4App usando o Parse SDK.

#### Etapa 2 - Instalar o Parse SDK
O Parse SDK para JavaScript pode ser usado em uma grande quantidade de plataformas e frameworks. Abaixo temos a instalação Parse SDK para React Native:

##### *1. Intalando o módulo npm*
Primeiramente instale o módulo Parse NPM e o AsyncStorage. Para fazer isso, execute o seguinte comando:
```bash
  npm install parse @react-native-async-storage/async-storage --save
```
Use CocoaPods para adicionar o RNAsyncStorage nativo ao seu projeto:
```bash
  cd ios & pod-install
```

##### *2. Intalando o SDK*
```js
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

//Antes de usar o SDK...
Parse.setAsyncStorage(AsyncStorage);
```

#### Etapa 3 - Inserindo suas Keys e inicializando Parse SDK
Para conectar completamente seu aplicativo ao Back4App, você precisa configurar as chaves do aplicativo e inicializar o SDK do Parse.

Para inicializar o Parse SDK em seu projeto JavaScript, adicione o código abaixo em seu arquivo index.html, dentro da tag **<script>**.

```js
Parse.initialize("APP_ID","JS_KEY"); //Cole aqui sua Back4App APPLICATION ID e sua JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'
```
Suas keys estão disponíveis em *Dashboard > App Settings > Security & Keys*.

#### Etapa 4 - Salve e Leia seu primeiro Data Object
Para garantir que a conexão entre seu projeto e o Back4App foi estabelecida corretamente, vamos fazer um teste no qual iremos salvar e ler um objeto no Back4App.

```js
//Salvando seu primeiro Data Object no Back4App
async function saveNewPerson() {
  const person = new Parse.Object("Person");

  person.set("name", "John Snow");
  person.set("age", 27);
  try {
    let result = await person.save()
    alert('New object created with objectId: ' + result.id);
    } catch(error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }
  } 

//Lendo seu primeiro Data Object do Back4App
async function retrievePerson() {
  const query = new Parse.Query("Person");
  
  try {
    const person = await query.get("mhPFDlCahj");
    const name = person.get("name");
    const age = person.get("age");
  
    alert(`Name: ${name} age: ${age}`);
  } catch (error) {
    alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}  
```

#### Etapa 5 - Vá para Dashboard e verifique seu Data
Depois de executar o código acima, você pode voltar ao seu Dashboard e atualizar o navegador para ver as alterações :)

![Dashboard](https://www.back4app.com/docs/assets/images/png/save-first-data-object.png)

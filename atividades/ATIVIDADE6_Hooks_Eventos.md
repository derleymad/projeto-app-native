# Hooks e Eventos

## Hooks
- Hooks são funções que nos permitem utilizar funcionalidades de componentes de classe sem necessidade de uma classe.
- Foram criados para utilizar estado e outras funcionalidades que eram apenas possíveis em classes.
- Alguns exemplos de funcionalidades que só eram possíveis em classes são os estados e os ciclos de vida, eles foram implementados em componentes de funções através dos hooks useState e useEffect.
Alguns exemplos de uso de hooks:
```ts
import { useState, useEffect } from 'react';
import { Button, Text } from 'react-native';

const ButtonCounter = () => {
  // useState é usado para trabalhar com estados em componentes de função.
  const [counter, setCounter] = useState(0);
  const [isEven, setIsEven] = useState(true);

  /*
  * useEffect é usado para lidar com os ciclos de vida do componente
  * Nesse essa função que é passada como callback só será chamada caso o estado "counter" seja alterado
  * Quando o estado "counter" é alterado o componente é reconstruido e o callback é chamado
  * Esse comportamento ocorria no método componentDidMount do componente de classes
  */
  useEffect(() => {
    setIsEven(counter % 2 === 0);
  }, [counter]);

  return (
    <>
      <Button
        // Evento de pressionar em um botão ao pressionar o callback será chamado
        onPress={() => setCounter(prevCounter => prevCounter + 1)}
        title="press me"
      />
      <Text>O botão foi pressionado {counter} vezes.</Text>
      <Text>A quantidade de vezes pressionadas é {isEven ? 'par' : 'impar'}</Text>
    </>
  )
}
```

## Eventos
Eventos são ações que ocorrem com as interações do usuário, um exemplo disso seria ao pressionar um botão mudar de tela ou enviar algo para um servidor.

- Ex:

```ts
  <Button
    /* O exemplo utilizado anteriormente no componente de botão
    *  Basicamente ao pressionar o botão o contador irá adicionar mais um
    */
    onPress={() => setCounter(prevCounter => prevCounter + 1)}
    title="press me"
  />
```
## Testes Automatizados

### O que são testes automatizados?
O teste de software é uma parte crucial do desenvolvimento de software, ainda que muitas empresas negligenciem essa etapa e não invistam pesado para garantir a qualidade do produto que está sendo desenvolvido. Desse modo, essas empresas que não automatizam seus testes aumentam as chances de um erro passar despercebido, além de gastar recursos valiosos com uma ação pouco eficiente. E é nesse ponto que a automação surge para resolver o problema. O teste automatizado é um recurso muito utilizado no desenvolvimento de software, onde o principal objetivo é facilitar a etapa de teste por meio de ferramentas específicas. Dessa forma, é possível pré-programar o que será testado para então só agir quando for necessário. E isso traz uma série de benefícios, diretos e indiretos, para o processo de desenvolvimento de software. Vamos conhecer os principais, logo abaixo. Existem várias vantagens em implementar uma rotina de testes automatizados para software. A principal, talvez, é a redução do erro humano por meio de testes manuais, ainda que a equipe responsável seja extremamente qualificada.

## React Native Testing Library
### Instalação
A React Native Testing Library (RNTL) é uma solução leve para testar componentes React Native. Ele fornece funções utilitárias leves sobre o react-test-renderer, de uma forma que incentiva melhores práticas de teste. Seu principal princípio orientador é:
- Quanto mais seus testes se assemelharem à forma como seu software é usado, mais confiança eles podem lhe dar.

Usando ```yarn```
```css
yarn add --dev @testing-library/jest-native

```

Usando ```npm```
```css
npm install --save-dev @testing-library/jest-native

```
### Exemplo
```js
import { render, screen, fireEvent } from '@testing-library/react-native';
import { QuestionsBoard } from '../QuestionsBoard';

test('form submits two answers', () => {
  const allQuestions = ['q1', 'q2'];
  const mockFn = jest.fn();

  render(<QuestionsBoard questions={allQuestions} onSubmit={mockFn} />);

  const answerInputs = screen.getAllByLabelText('answer input');

  fireEvent.changeText(answerInputs[0], 'a1');
  fireEvent.changeText(answerInputs[1], 'a2');
  fireEvent.press(screen.getByText('Submit'));

  expect(mockFn).toBeCalledWith({
    1: { q: 'q1', a: 'a1' },
    2: { q: 'q2', a: 'a2' },
  });
});
```

## Como utilizar no seu projeto?
- Serve para facilitar a manutenção do código.
- Serve como documentação.
- Serve para testar a usabilidade do projeto.

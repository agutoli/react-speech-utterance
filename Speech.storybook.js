import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import Speech from './Speech';

storiesOf('Speech', module)
  .add('default', () => (
    <div>
      <Speech
        lang="pt-BR"
        text="Título: Eike tinha interesse mais direto com Mantega”, dizem investigadores"
        onCurrentWord={(word) => action(`Text: ${word}`)()} />
      <Speech
        lang="pt-BR"
        text="Subtítulo: Eles desconfiam de informações prestadas pelo empresário sobre quitação de dívidas eleitorais"
        onCurrentWord={(word) => action(`Text: ${word}`)()} />
    </div>
  ));

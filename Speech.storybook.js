import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import Speech from './Speech';

storiesOf('Speech', module)
  .add('default', () => (
    <div>
      <Speech
        lang="pt-BR"
        label="Ouvir"
        text="Assim que o placar fechou em 3 a 2, um aliado que acompanhava a votação no plenário do Supremo Tribunal Federal se apressou em telefonar para o deputado Celso Russomanno, do PRB de São Paulo. “Ganhou, você ganhou! Acabou o sofrimento”, disse. Naquela tarde de terça-feira, dia 9 de agosto, o ministro Gilmar Mendes, num voto de desempate, absolveu Russomanno do crime de peculato – era acusado de pagar uma funcionária de sua produtora com dinheiro público – e manteve seus direitos políticos. Russomanno ficou com o caminho livre para concorrer à prefeitura de São Paulo em outubro. Quando ouviu a boa-nova, chorou. “Deus foi justo comigo”, disse. Na sequência, desceu e subiu pelas escadas – cinco vezes consecutivas – os nove andares que separam seu gabinete do térreo do Anexo IV da Câmara dos Deputados. “Era uma espécie de propósito religioso”, afirma o deputado Marcelo Squassoni, coordenador de sua campanha, que presenciou a catarse. “Quando soube que poderia sair candidato, entrou em parafuso. Ele é frágil psicologicamente, fez isso para dar uma baixada na ansiedade”, diz um opositor, numa explicação mais terrena."
        onCurrentWord={(word) => action(`Text: ${word}`)()} />
    </div>
  ));

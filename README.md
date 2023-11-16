# dummy-copilot

IMPORTANT INFO:
----------------- Mudei essa info abaixo ----------------
- Se há uma tipagem para um parâmetro de entrada na classe A, a interface desse param deve estar no mesmo package desta classe A, pois é a classe quem define a interface do input. Na criação do input em outro módulo, ele deve importar e implementar esta interface. Parece um pouco com o pattern das props de componentes React. Posso tentar padronizar os types dos demais módulos desta forma e apagar a pasta "types".

- ReturnType<Type> => Pode ajudar bastante a simplificar as tipagens;

TODOS:

- INTERESSANTE: Hoje o IAction comporta diferentes tipos de actions ("sequence" | "paste" | "retrieve_clipboard" | "feed_clipboard"), cada uma com atributos comuns, mas também com atributos distintos/únicos. Na real o melhor seria ter várias interfaces que herdam do IAction, e fazer algum polimorfismo. De qualquer forma, esse caso parece ser claramente um caso interessante para se usar factories... eu poderia ter uma [factoryAction]/[createAction]... a factory usa a interface mais genérica e encapsula as interfaces mais especificas, seria bem proveitoso.

- Adicionar ENV para usar um json de shortcuts diferentes do de prod e de dev. Adicionar gitignore para o de prod... pra eu poder salvar um com senhas e coisas do tipo.

- No 'shortcuts', o attrib 'validActionsTypes', tem como eu tipar esse cara pra que o array possua todas as keys do IAction.actionType?

- Permitir insercao de um trigger via bash?

- Documentar necessidade de fazer o npm i com a versao 10.4.0 do node? (nem sei se eh exatamente esse o problema).

- Criar testes que garantem a nao corrompibilidade da classe "Shortcut". Nesse teste, tentar inserir actions e triggers invalidos e retornar false. Nos setters garantir que nunca vou conseguir inserir um cara problematico... de forma que nos getters sempre q eu puxar algo vai ser um dado que com certeza segue a estrutura da interface. Documentar isso, posso documentar nos testes, ou usando js-docs!

- Estudar style-guide de TS: https://google.github.io/styleguide/tsguide.html

- Documentar o uso do "sudo apt-get install xclip"

- Documentar sobre a necessidade de se executar como SUDO.

- Documentar sobre como identificar no linux o eventX do teclado. Reforçar que só tem suporte pra linux.

- Documentar sobre as possíveis dependencias advindas da lib 'robotjs'.

- Documentar o 'chmod +x' no bin do executavel. https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

- Adicionar comentário aqui no read-me sobre o package apontando para o github no package.json, git+https://github.com/octalmage/robotjs.git. Explicar q é por conta do bug do delay, que, foi resolvido mas o npm não trás a última versão: https://github.com/octalmage/robotjs/issues/530#issuecomment-756057632.

- Estudar a lib robotjs. Ela tem uns trem muito interessante, especialmente como criar uma lib em C/CPP para ser uma lib JS.

- Adicionar config pra mudar o delay: robot.setKeyboardDelay(5); ?? Parece que essa config não funciona mais?

- Usar sudo com interface gráfica: https://www.npmjs.com/package/sudo-prompt

- Criar launch.json para debug (difícil por causa do SUDO)

- Testar no trigger-logger todas as teclas do teclado, conferir se todas estão mapeadas

- Criar ũtil de validação pra 'action' da mesma forma que existe para as 'keys'? Isso me levanta uma dúvida, eu deveria ter esses utils não genéricos? O util parser 'shortcuts-file-parser' por exemplo não deveria ser um util dentro do service 'shortcut-manager'?

- Debug com sudo: https://stackoverflow.com/questions/40033311/how-to-debug-programs-with-sudo-in-vscode

- Keylogger para Windows e Mac: https://github.com/aabuhijleh/keylogger.js
    - https://learn.microsoft.com/pt-br/windows/apps/design/input/keyboard-events
    - https://learn.microsoft.com/pt-br/windows/win32/inputdev/about-keyboard-input

- CLI vs GUI: Acho que vou ter que criar primeiro um CLI pra depois o GUI. O sudo-prompt eu acho que entra apenas no GUI.

- Libs para criar um bom CLI: https://www.youtube.com/watch?v=_oHByo8tiEY
    - https://github.com/fireship-io/javascript-millionaire
    - https://github.com/chalk/chalk
    - https://github.com/SBoudrias/Inquirer.js
    - https://github.com/usmanyunusov/nanospinner

    - https://github.com/leondreamed/inquirer-press-to-continue
    - https://github.com/eduardoboucas/inquirer-table-prompt
    - https://github.com/insightfuls/inquirer-tree-prompt

- Paginação de CLIs:
    - https://github.com/jaipack17/cli-pages/blob/main/package.json



- Forma interessante de tipar classes:

export interface UserProps {
    id: string;
    name: string;
    email: string;
}

export default class User {
    private _props: UserProps;
    constructor(props: UserProps) {
        this._props = props;
    }
}


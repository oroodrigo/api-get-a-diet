# App

App de acompanhamento nutricional.

## RFs (Requisitos funcionais)

- [ ] Deve ser possivel o usuario criar uma conta;
- [ ] Deve ser possivel o usuario se autenticar;
- [ ] Deve ser possivel distinguir se é nutricionista ou paciente;
- [ ] Deve ser possivel o usuario editar suas informações;
- [ ] Deve ser possivel confirmar refeiçoes feitas corretamente;
- [ ] Deve ser possivel acompanhar a quantidade de dias consecutivos em que a dieta é seguida;
- [ ] Deve ser possivel baixar dietas;
- [ ] Deve ser possivel criar dietas;
- [ ] Deve ser possivel editar dietas;
- [ ] Deve ser possivel excluir dietas;

## RN (Regras de Negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] Nutricionista deve ter CRN valido;
- [ ] Usuario so podem seguir uma dieta por vez;
- [ ] Apenas nutricionistas podem criar, editar e excluir dietas; 

## RFNs (Requisitos não funcionais)

- [ ] A senha do usuario deve ser criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco FireBase;
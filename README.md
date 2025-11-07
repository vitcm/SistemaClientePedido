# SistemaClientePedido

// INSTRUÇÕES

Pastas que compõe o programa:  
ProjAngular (contém todo o frontend);  
SQL (contém todas as queries exigidas no exercício, organizadas por arquivo);

Para rodar o programa:  
1 - Clonar/baixar o repositório  
2 - Abrir dois terminais 
3 - Nos dois terminais: cd ProjAngular (em um deles rodar o npm install para instalar todas as dependências do projeto)
4 - Primeiro terminal: ng serve  
5 - Segundo terminal: json-server --watch db.json --port 3000  
6 - abrir os links:  
http://localhost:4200/ para o frontend  
http://localhost:3000/ para ver a APIJson rodando

EXTRA: Para rodar os testes, abrir o terminal e digitar o comando ng test.

Dependências do Node/Angular:

- express (npm install express uuid)
- uuid (npm install -D @types/express @types/uuid)

Versão Node: 20.18.1  
Versão Angular: 19.2.19

Banco de dados: PostgreSQL

Observações:  
Dado o meu tempo livre, eu não consegui entregar tão rápido nem tão estilizado quanto eu gostaria. Prezo muito pelo visual dos meus projetos e dessa vez não consegui focar tanto, dando preferência para a minha lógica, funcionamento e organização do projeto.  
Sobre os testes, foi meu primeiro contato com testes unitários, visto que nunca foi uma prioridade em outros projetos que trabalhei. Dito isso, acredito que com um pouco de tempo eu conseguiria estudar mais e melhorar os resultados apresentados, tive um pouco de dificuldade de desenvolver esse ponto.

Melhorias futuras:

- Desenvolver um layout mais bonito e funcional, principalmente nos modais;
- Usar Angular Reactive Forms para que, no caso de crescimento do software, ele consiga receber validações mais complexas;
- Desenvolvimento/estudo dos testes unitários;
- Implementar uma API real com validações mais completas e salvamento de dados em banco;
- Criar um toast personalizado para mensagens de sucesso e erro;

Decisões arquiteturais:  
O projeto foi desenvolvido com Angular usando componentes standalone, que ajudam a reduzir dependências de módulos e também simplificar a estrutura. O "backend" é acionado através de serviços, na pasta Services, que fazem as requisições HTTP. Para os forms, usei o padrão Template-drivem Forms, por ser um código simples, isso facilitaria a manutenção, mas uma alteração futura seria adotar os Angular Reactive Forms conforme mencionado no Bônus da tarefa.  
As entidades Clientes e Pedidos mantém um relacionamento lógico entre si, podendo vincular dados de um com o outro, permitindo o salvamento delas conforme exigido no desafio. Foram gerados alguns dados mockados para facilitar o entendimento do sistema.

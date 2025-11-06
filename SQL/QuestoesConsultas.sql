-- QUERY 01
SELECT 
    p.id AS pedido_id,
    c.nome AS cliente_nome,
    p.valor_total,
    p.status,
    p.data_pedido
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id
ORDER BY p.data_pedido DESC;
-- Eu seleciono os itens de cada tabela que preciso e, por querer o nome do cliente, ao invés do ID, eu necessito de fazer um Join com a tabela cliente para retornar esse nome de acordo com o ID equivalente.


-- QUERY 02
SELECT 
    c.nome AS cliente_nome,
    SUM(p.valor_total) AS total_vendas
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id
-- WHERE p.status = 'APROVADO'
GROUP BY c.nome
ORDER BY total_vendas DESC;
-- Novamente é necessário um join pra receber o Nome do cliente, seguindo a mesma lógica da query anterior. Nessa, eu agrupo por cliente para não haver dados duplicados/repetidos e ordeno de acordo com o total, para visualizar da 'maior' compra para a 'menor'. Deixei comentado, mas existe a opção de fazer essa soma apenas para compras que tem o status 'APROVADO'. 



-- QUERY 03
SELECT 
    c.id,
    c.nome,
    c.email,
    c.telefone,
    c.criado_em
FROM cliente c
LEFT JOIN pedido p ON p.cliente_id = c.id
WHERE p.id IS NULL;
-- Dessa vez, o join necessário é com pedidos, visto que o foco é na tabela de cliente. Eu seleciono quais dados eu quero que sejam retornados, que são apenas da tabela cliente, por isso não faço um select *, e faço um left join dessa vez pois quero que traga todo mundo que não tem correspondência em pedido. E filtro onde não existe ID de pedido.


-- QUERY 04
SELECT 
    ROUND(AVG(valor_total), 2) AS ticket_medio
FROM pedido
WHERE status = 'APROVADO'
  AND data_pedido >= date_trunc('month', CURRENT_DATE)
  AND data_pedido < date_trunc('month', CURRENT_DATE + INTERVAL '1 month');
-- Para essa questão, fiz dois cenários, pois fiquei com dúvida se o último mês referido seria o mês anterior ou o mês atual. Primeiramente eu faço o ROUND para pegar duas casas após a vírgula e uso o AVG para fazer a média dos valores. Faço o filtro para que conte apenas com o status aprovado e vem o filtro da data, que uso o date_trunc, que serve para retornar o primeiro dia do mês, no primeiro cenário eu pego com intervalo de um mês antes.


-- QUERY 05
SELECT 
    p.id AS pedido_id,
    p.valor_total AS valor_registrado,
    SUM(pi.quantidade * pi.preco_unitario) AS soma_itens
FROM pedido p
JOIN pedido_item pi ON pi.pedido_id = p.id
GROUP BY p.id, p.valor_total
HAVING p.valor_total <> SUM(pi.quantidade * pi.preco_unitario);
-- Eu faço o select 'principal' em pedido para pegar o id e o valor total daquele pedido. O join dessa vez ocorre com pedido_item, onde tem o pedido_id equivalente do id do pedido, e com isso eu somo a quantidade*preço dos itens da compra. O groupby aqui ocorre para que junte os itens por pedido, e no final eu faço uma validação HAVIN que mostra apenas os pedidos onde os valores não batem. Nesse cenário, eu uso o having ao invés do where pois eu filtro apenas depois do group by, quando o where funciona ao contrário.


-- QUERY 06
SELECT 
    pi.produto_nome,
    SUM(pi.quantidade) AS total_vendido
FROM pedido_item pi
JOIN pedido p ON p.id = pi.pedido_id
WHERE p.data_pedido >= (CURRENT_DATE - INTERVAL '3 months')
GROUP BY pi.produto_nome
ORDER BY total_vendido DESC
LIMIT 1;
-- Aqui eu faço o select do pedido_item pra retornar o nome e o total usando SUM, faço o join com pedido para saber os dados necessários do pedido (a data, no caso, que deve ser nos últimos 3 meses). Eu faço o orderby para que o mais vendido fique em primeiro lugar e faço o LIMIT 1 para que só mostre esse primeiro produto.
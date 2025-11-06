DROP TABLE IF EXISTS pedido_item CASCADE;
DROP TABLE IF EXISTS pedido CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;

DROP TYPE IF EXISTS status_pedido;

-- Create table cliente
CREATE TABLE cliente (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT NOW()
);


-- Create table pedido
CREATE TYPE status_pedido AS ENUM ('PENDENTE', 'APROVADO', 'CANCELADO');
CREATE TABLE pedido (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID NOT NULL REFERENCES cliente(id) ON DELETE CASCADE,
    data_pedido TIMESTAMP NOT NULL,
    status status_pedido NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL
);


-- Create table pedido item
CREATE TABLE pedido_item (
    id UUID PRIMARY KEY,
    pedido_id UUID NOT NULL REFERENCES pedido(id) ON DELETE CASCADE,
    produto_nome VARCHAR(120) NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL
);

-- POPULAR TABELA cliente
INSERT INTO cliente (id, nome, email, telefone, criado_em) VALUES
('c2121212-4444-4555-8666-777777777777', 'Fulano de tal', 'fulano@email.com', '(62) 99999-9191', '2025-11-06T10:00:00Z'),
('b8a1d1e0-1234-4c90-a1d9-1c2b3a4e5f6a', 'Vitórya Moraes', 'vitorya.moraes@email.com', '(11) 99999-0001', '2025-11-05T10:00:00Z'),
('c1b2a3d4-5678-4a90-b2c3-d4e5f6a7b8c9', 'João Silva', 'joao.silva@email.com', '(21) 98888-2222', '2025-11-04T09:30:00Z'),
('d2c3b4a5-9101-4f12-c3d4-e5f6a7b8c9d0', 'Ana Souza', 'ana.souza@email.com', '(31) 97777-3333', '2025-11-03T15:45:00Z');

-- POPULAR TABELA pedido
INSERT INTO pedido (id, cliente_id, data_pedido, status, valor_total) VALUES
('a1111111-2222-4333-8444-555555555555', 'b8a1d1e0-1234-4c90-a1d9-1c2b3a4e5f6a', '2025-11-05T13:20:00Z', 'APROVADO', 1200.50),
('b2222222-3333-4444-8555-666666666666', 'c1b2a3d4-5678-4a90-b2c3-d4e5f6a7b8c9', '2025-11-04T16:00:00Z', 'PENDENTE', 800.00),
('c3333333-4444-4555-8666-777777777777', 'd2c3b4a5-9101-4f12-c3d4-e5f6a7b8c9d0', '2025-11-03T18:45:00Z', 'CANCELADO', 300.75);

-- POPULAR TABELA pedido_item
INSERT INTO pedido_item (id, pedido_id, produto_nome, quantidade, preco_unitario) VALUES
('d4444444-5555-4666-8777-888888888888', 'a1111111-2222-4333-8444-555555555555', 'Notebook Dell XPS 13', 1, 1200.50),
('e5555555-6666-4777-8888-999999999999', 'b2222222-3333-4444-8555-666666666666', 'Monitor LG Ultrawide', 2, 400.00),
('f6666666-7777-4888-8999-aaaaaaaaaaaa', 'c3333333-4444-4555-8666-777777777777', 'Mouse Logitech MX Master 3', 1, 300.75);
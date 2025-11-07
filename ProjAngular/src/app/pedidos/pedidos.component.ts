import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PedidosService, Pedido } from '../services/pedidos.service';
import { ClientesService, Cliente } from '../services/clientes.service';
import { v4 as uuidv4 } from 'uuid';

interface PedidoItem {
  produto_nome: string;
  quantidade: number;
  preco_unitario: number;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  showModal = false;
  itens: PedidoItem[] = [];
  termoPesquisa: string = '';
  novoPedido = { cliente_id: '', valor_total: 0 };
  novoCliente = { cliente: '', data: '', status: '', total: '' };
  pedidosFiltrados = [...this.pedidos];
  isViewMode = false;

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.carregarPedidos();
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesService.getClientes().subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Erro ao carregar clientes', err),
    });
  }

  carregarPedidos() {
    this.pedidosService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.pedidosFiltrados = [...this.pedidos];
      },
      error: (err) => console.error('Erro ao carregar pedidos', err),
    });
  }

  salvarPedido() {
    if (!this.novoPedido.cliente_id) {
      alert('Selecione um cliente');
      return;
    }

    if (this.itens.length === 0) {
      alert('Adicione pelo menos um item');
      return;
    }

    for (const item of this.itens) {
      if (
        item.quantidade <= 0 ||
        item.preco_unitario < 0 ||
        !item.produto_nome
      ) {
        alert('Todos os itens devem ter nome, quantidade > 0 e preço >= 0');
        return;
      }
    }

    const valor_total = this.calcularTotal();
    const data_pedido = new Date().toISOString();
    const statusOptions = ['APROVADO', 'PENDENTE', 'CANCELADO'];
    const status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const pedidoParaSalvar: Omit<Pedido, 'id'> = {
      cliente_id: this.novoPedido.cliente_id,
      data_pedido,
      status,
      valor_total: valor_total.toFixed(2),
    };

    this.pedidosService.addPedido(pedidoParaSalvar).subscribe({
      next: (pedidoSalvo) => {
        const itensParaSalvar = this.itens.map((item) => ({
          id: uuidv4(),
          pedido_id: pedidoSalvo.id,
          produto_nome: item.produto_nome,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        }));

        itensParaSalvar.forEach((item) => {
          this.pedidosService.addPedidoItem(item).subscribe({
            next: () => {},
            error: (err) => console.error('Erro ao salvar item', err),
          });
        });

        this.closeModal();
        this.carregarPedidos();

        alert('Pedido salvo com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao salvar pedido', err);
        alert('Erro ao salvar pedido.');
      },
    });
  }

  adicionarItem() {
    this.itens.push({ produto_nome: '', quantidade: 0, preco_unitario: 0 });
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }

  calcularTotal(): number {
    return this.itens.reduce(
      (acc, item) => acc + item.quantidade * item.preco_unitario,
      0
    );
  }

  getNomeCliente(cliente_id: string): string {
    const cliente = this.clientes.find((c) => c.id === cliente_id);
    return cliente ? cliente.nome : 'Desconhecido';
  }

  openModal() {
    this.isViewMode = false;
    this.itens = [];
    this.novoPedido = { cliente_id: '', valor_total: 0 };
    this.showModal = true;
  }

  openViewModal(pedido: Pedido) {
    this.isViewMode = true;
    this.showModal = true;
    this.novoPedido = {
      cliente_id: pedido.cliente_id,
      valor_total: Number(pedido.valor_total),
    };

    this.pedidosService.getItensPorPedido(pedido.id).subscribe({
      next: (itens) => (this.itens = itens),
      error: (err) => console.error('Erro ao carregar itens do pedido', err),
    });
  }

  closeModal() {
    this.showModal = false;
  }

  filtrarPedidos() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    this.pedidosFiltrados = this.pedidos.filter((pedido) => {
      const cliente = this.clientes.find((c) => c.id === pedido.cliente_id);
      const nomeCliente = cliente ? cliente.nome.toLowerCase() : '';
      const status = pedido.status.toLowerCase();

      return nomeCliente.includes(termo) || status.includes(termo);
    });
  }
}

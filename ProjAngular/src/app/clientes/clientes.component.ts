import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../services/clientes.service';
import { PedidosService, Pedido } from '../services/pedidos.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  termoPesquisa: string = '';
  title = 'ProjAngular';
  showModal = false;
  showModalDelete = false;
  clienteParaDeletarId: string | null = null;
  clienteEditando: Cliente | null = null;

  clientesFiltrados = [...this.clientes];
  novoCliente: Partial<Cliente> = { nome: '', email: '', telefone: '' };

  constructor(
    private clientesService: ClientesService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.clientesFiltrados = [...this.clientes];
      },
      error: (err) => console.error('Erro ao carregar clientes', err),
    });
  }

  openModal(cliente?: Cliente) {
    if (cliente) {
      this.clienteEditando = cliente;
      this.novoCliente = { ...cliente };
    } else {
      this.clienteEditando = null;
      this.novoCliente = { nome: '', email: '', telefone: '' };
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.clienteEditando = null;
    this.novoCliente = { nome: '', email: '', telefone: '' };
  }

  openModalDelete(id: string) {
    console.log('id', id);
    this.clienteParaDeletarId = id;
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
    this.clienteParaDeletarId = null;
  }

  salvarCliente() {
    if (!this.novoCliente.nome || !this.novoCliente.email) {
      alert('Nome e email são obrigatórios.');
      return;
    }

    const clienteParaSalvar: Omit<Cliente, 'id'> = {
      nome: this.novoCliente.nome!,
      email: this.novoCliente.email!,
      telefone: this.novoCliente.telefone ?? '',
    };

    if (this.clienteEditando) {
      this.clientesService
        .updateCliente(this.clienteEditando.id, clienteParaSalvar)
        .subscribe({
          next: () => {
            alert('Cliente atualizado com sucesso!');
            this.closeModal();
            this.carregarClientes();
          },
          error: (err) => alert('Erro ao atualizar cliente'),
        });
    } else {
      this.clientesService.addCliente(clienteParaSalvar).subscribe({
        next: () => {
          alert('Cliente adicionado com sucesso!');
          this.closeModal();
          this.carregarClientes();
        },
        error: (err) => alert('Erro ao adicionar cliente'),
      });
    }
  }

  deletarCliente() {
    // if (!this.clienteParaDeletarId) return;

    this.pedidosService.getPedidos().subscribe({
      next: (pedidos) => {
        const temPedidos = pedidos.some(
          (p) => p.cliente_id === this.clienteParaDeletarId
        );

        if (temPedidos) {
          alert(
            'Não é possível excluir este cliente porque há pedidos vinculados.'
          );
          this.closeModalDelete();
          return;
        }

        this.clientesService
          .deleteCliente(this.clienteParaDeletarId!)
          .subscribe({
            next: () => {
              alert('Cliente excluído com sucesso!');
              this.closeModalDelete();
              this.carregarClientes();
            },
            error: (err) => alert('Erro ao excluir cliente'),
          });
      },
      error: (err) => alert('Erro ao verificar pedidos'),
    });
  }

  filtrarClientes() {
    const termo = this.termoPesquisa.toLowerCase().trim();
    this.clientesFiltrados = this.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(termo)
    );
  }
}

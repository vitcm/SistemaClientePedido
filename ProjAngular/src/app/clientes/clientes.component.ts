import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  termoPesquisa: string = '';
  title = 'ProjAngular';
  showModal = false;
  showModalDelete = false;

  clientes = [
    { nome: 'Vitórya Moraes', email: 'vitorya.moraes@email.com' },
    { nome: 'João Silva', email: 'joao.silva@email.com' },
    { nome: 'Ana Souza', email: 'ana.souza@email.com' },
  ];

  clientesFiltrados = [...this.clientes];
  novoCliente = { nome: '', email: '' };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.novoCliente = { nome: '', email: '' };
  }

  openModalDelete() {
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
  }

  salvarCliente() {
    if (this.novoCliente.nome && this.novoCliente.email) {
      this.clientes.push({ ...this.novoCliente });
      this.closeModal();
    }
  }

  deletarCliente() {
    this.closeModalDelete();
  }

  filtrarClientes() {
    const termo = this.termoPesquisa.toLowerCase().trim();
    this.clientesFiltrados = this.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(termo)
    );
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ProjAngular';

  showModal = false;
  showModalDelete = false;

  clientes = [
    { nome: 'Vitórya Moraes', email: 'vitorya.moraes@email.com' },
    { nome: 'João Silva', email: 'joao.silva@email.com' },
    { nome: 'Ana Souza', email: 'ana.souza@email.com' },
  ];

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
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  showModal = false;

  itens = [{ nome: 'Produto A', quantidade: 1, preco: 10.0 }];

  salvarPedido() {}

  adicionarItem() {
    this.itens.push({ nome: '', quantidade: 0, preco: 0 });
  }

  removerItem(index: number) {
    this.itens.splice(index, 1);
  }

  calcularTotal() {
    return this.itens.reduce(
      (acc, item) => acc + item.quantidade * item.preco,
      0
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

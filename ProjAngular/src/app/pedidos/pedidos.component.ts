import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  showModal = false;
  itens = [{ nome: '', quantidade: 0, preco: 0 }];
  novoCliente = { cliente: '', data: '', status: '', total: '' };

  salvarPedido() {}

  adicionarItem() {
    this.itens.push({ nome: '', quantidade: 0, preco: 0 });
  }

  // addItem(index: number) {
  //   const item = this.itens[index];

  //   console.log('item', item);

  //   if (item.quantidade <= 0 || item.preco < 0) {
  //     alert(
  //       'A quantidade deve ser maior que 0 e o preço não pode ser negativo.'
  //     );
  //     return;
  //   }

  //   const total = this.calcularTotal();
  //   console.log('Total atualizado: R$', total.toFixed(2));
  // }

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
    this.itens = [];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

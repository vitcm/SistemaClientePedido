import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: string;
  cliente_id: string;
  data_pedido: string;
  status: string;
  valor_total: string;
}

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  addPedido(pedido: Omit<Pedido, 'id'>): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  addPedidoItem(item: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/pedido_itens', item);
  }

  // updatePedido(id: string, pedido: Partial<Pedido>): Observable<Pedido> {
  //   return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  // }

  // deletePedido(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}

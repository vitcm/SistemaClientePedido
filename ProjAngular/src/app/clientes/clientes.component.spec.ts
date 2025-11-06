import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesComponent } from './clientes.component';
import { ClientesService } from '../services/clientes.service';
import { PedidosService } from '../services/pedidos.service';
import { of } from 'rxjs';

const mockClientesService = {
  getClientes: jasmine.createSpy('getClientes').and.returnValue(of([])),
  addCliente: jasmine.createSpy('addCliente').and.returnValue(of({})),
  updateCliente: jasmine.createSpy('updateCliente').and.returnValue(of({})),
  deleteCliente: jasmine.createSpy('deleteCliente').and.returnValue(of({})),
};

const mockPedidosService = {
  getPedidos: jasmine.createSpy('getPedidos').and.returnValue(of([])),
};

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent],
      providers: [
        { provide: ClientesService, useValue: mockClientesService },
        { provide: PedidosService, useValue: mockPedidosService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve filtrar clientes pelo nome corretamente', () => {
    component.clientes = [
      {
        id: '1',
        nome: 'Vitórya Castro',
        email: 'v@example.com',
        telefone: '9999-9999',
      },
      {
        id: '2',
        nome: 'João Silva',
        email: 'j@example.com',
        telefone: '8888-8888',
      },
    ];

    component.termoPesquisa = 'vitó';
    component.filtrarClientes();

    expect(component.clientesFiltrados.length).toBe(1);
    expect(component.clientesFiltrados[0].nome).toBe('Vitórya Castro');
  });
});

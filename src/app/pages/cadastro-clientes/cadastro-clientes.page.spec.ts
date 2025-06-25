import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroClientesPage } from './cadastro-clientes.page';

describe('CadastroClientesPage', () => {
  let component: CadastroClientesPage;
  let fixture: ComponentFixture<CadastroClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroEquipamentosPage } from './cadastro-equipamentos.page';

describe('CadastroEquipamentosPage', () => {
  let component: CadastroEquipamentosPage;
  let fixture: ComponentFixture<CadastroEquipamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEquipamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

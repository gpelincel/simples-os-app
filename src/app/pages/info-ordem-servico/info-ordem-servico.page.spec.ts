import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoOrdemServicoPage } from './info-ordem-servico.page';

describe('InfoOrdemServicoPage', () => {
  let component: InfoOrdemServicoPage;
  let fixture: ComponentFixture<InfoOrdemServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoOrdemServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoClientePage } from './info-cliente.page';

describe('InfoClientePage', () => {
  let component: InfoClientePage;
  let fixture: ComponentFixture<InfoClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

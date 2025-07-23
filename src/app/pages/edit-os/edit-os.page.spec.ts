import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditOsPage } from './edit-os.page';

describe('EditOsPage', () => {
  let component: EditOsPage;
  let fixture: ComponentFixture<EditOsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

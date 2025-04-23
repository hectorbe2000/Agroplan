import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorFormPage } from './proveedor-form.page';

describe('ProveedorFormPage', () => {
  let component: ProveedorFormPage;
  let fixture: ComponentFixture<ProveedorFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

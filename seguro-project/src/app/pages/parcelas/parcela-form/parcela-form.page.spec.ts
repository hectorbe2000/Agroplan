import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParcelaFormPage } from './parcela-form.page';

describe('ParcelaFormPage', () => {
  let component: ParcelaFormPage;
  let fixture: ComponentFixture<ParcelaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

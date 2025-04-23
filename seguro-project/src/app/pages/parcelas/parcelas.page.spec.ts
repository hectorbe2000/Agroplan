import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParcelasPage } from './parcelas.page';

describe('ParcelasPage', () => {
  let component: ParcelasPage;
  let fixture: ComponentFixture<ParcelasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

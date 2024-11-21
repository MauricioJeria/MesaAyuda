import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaColaboradorPage } from './pantalla-colaborador.page';

describe('PantallaColaboradorPage', () => {
  let component: PantallaColaboradorPage;
  let fixture: ComponentFixture<PantallaColaboradorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaColaboradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

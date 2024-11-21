import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallaAdminPage } from './pantalla-admin.page';

describe('PantallaAdminPage', () => {
  let component: PantallaAdminPage;
  let fixture: ComponentFixture<PantallaAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

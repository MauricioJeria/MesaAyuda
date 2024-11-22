import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketDetallePage } from './ticket-detalle.page';

describe('TicketDetallePage', () => {
  let component: TicketDetallePage;
  let fixture: ComponentFixture<TicketDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

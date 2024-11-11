import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketGeneratePage } from './ticket-generate.page';

describe('TicketGeneratePage', () => {
  let component: TicketGeneratePage;
  let fixture: ComponentFixture<TicketGeneratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

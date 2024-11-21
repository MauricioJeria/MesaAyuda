import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketRevisionPage } from './ticket-revision.page';

describe('TicketRevisionPage', () => {
  let component: TicketRevisionPage;
  let fixture: ComponentFixture<TicketRevisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketRevisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

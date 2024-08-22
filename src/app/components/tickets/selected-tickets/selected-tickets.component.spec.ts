import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTicketsComponent } from './selected-tickets.component';

describe('SelectedTicketsComponent', () => {
  let component: SelectedTicketsComponent;
  let fixture: ComponentFixture<SelectedTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

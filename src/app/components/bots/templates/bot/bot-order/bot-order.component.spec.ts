import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotOrderComponent } from './bot-order.component';

describe('BotOrderComponent', () => {
  let component: BotOrderComponent;
  let fixture: ComponentFixture<BotOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWidgetComponent } from './start-widget.component';

describe('StartWidgetComponent', () => {
  let component: StartWidgetComponent;
  let fixture: ComponentFixture<StartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

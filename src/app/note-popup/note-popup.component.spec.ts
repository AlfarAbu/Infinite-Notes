import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePopsComponent } from './note-popup.component';

describe('NotePopsComponent', () => {
  let component: NotePopsComponent;
  let fixture: ComponentFixture<NotePopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotePopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

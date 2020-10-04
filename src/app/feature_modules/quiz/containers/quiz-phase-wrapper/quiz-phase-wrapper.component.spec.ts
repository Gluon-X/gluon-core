import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPhaseWrapperComponent } from './quiz-phase-wrapper.component';

describe('QuizPhaseWrapperComponent', () => {
  let component: QuizPhaseWrapperComponent;
  let fixture: ComponentFixture<QuizPhaseWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPhaseWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPhaseWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

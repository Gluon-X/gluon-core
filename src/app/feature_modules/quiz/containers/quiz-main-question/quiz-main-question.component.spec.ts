import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMainQuestionComponent } from './quiz-main-question.component';

describe('QuizMainQuestionComponent', () => {
  let component: QuizMainQuestionComponent;
  let fixture: ComponentFixture<QuizMainQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizMainQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMainQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

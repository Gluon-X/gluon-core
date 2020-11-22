import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizQuestionMediaComponent } from './quiz-question-media.component';

describe('QuizQuestionMediaComponent', () => {
  let component: QuizQuestionMediaComponent;
  let fixture: ComponentFixture<QuizQuestionMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizQuestionMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

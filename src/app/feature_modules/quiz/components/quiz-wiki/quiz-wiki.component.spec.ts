import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizWikiComponent } from './quiz-wiki.component';

describe('QuizWikiComponent', () => {
  let component: QuizWikiComponent;
  let fixture: ComponentFixture<QuizWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizWikiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

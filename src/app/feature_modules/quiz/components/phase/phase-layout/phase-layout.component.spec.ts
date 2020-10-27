import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseLayoutComponent } from './phase-layout.component';

describe('PhaseLayoutComponent', () => {
  let component: PhaseLayoutComponent;
  let fixture: ComponentFixture<PhaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

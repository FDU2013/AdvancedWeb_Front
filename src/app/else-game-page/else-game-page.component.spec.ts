import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElseGamePageComponent } from './else-game-page.component';

describe('ElseGamePageComponent', () => {
  let component: ElseGamePageComponent;
  let fixture: ComponentFixture<ElseGamePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElseGamePageComponent]
    });
    fixture = TestBed.createComponent(ElseGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

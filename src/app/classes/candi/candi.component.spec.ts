import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiComponent } from './candi.component';

describe('CandiComponent', () => {
  let component: CandiComponent;
  let fixture: ComponentFixture<CandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllAvatars } from './all-avatars';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AllAvatarsComponent', () => {
  let component: AllAvatars;
  let fixture: ComponentFixture<AllAvatars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAvatars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAvatars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
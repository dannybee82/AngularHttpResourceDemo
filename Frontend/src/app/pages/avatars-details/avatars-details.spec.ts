import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarsDetails } from './avatars-details';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AvatarsDetailsComponent', () => {
  let component: AvatarsDetails;
  let fixture: ComponentFixture<AvatarsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
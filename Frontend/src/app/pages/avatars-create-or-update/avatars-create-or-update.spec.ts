import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarsCreateOrUpdate } from './avatars-create-or-update';
import { describe, beforeEach, it, expect } from 'vitest';

describe('AvatarsCreateOrUpdateComponent', () => {
  let component: AvatarsCreateOrUpdate;
  let fixture: ComponentFixture<AvatarsCreateOrUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarsCreateOrUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarsCreateOrUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
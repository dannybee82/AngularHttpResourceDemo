import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCropper } from './image-cropper';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ImageCropperComponent', () => {
  let component: ImageCropper;
  let fixture: ComponentFixture<ImageCropper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCropper]
    });
    fixture = TestBed.createComponent(ImageCropper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
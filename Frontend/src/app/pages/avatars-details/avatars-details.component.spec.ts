import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsDetailsComponent } from './avatars-details.component';

describe('AvatarsDetailsComponent', () => {
  let component: AvatarsDetailsComponent;
  let fixture: ComponentFixture<AvatarsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAvatarsComponent } from './all-avatars.component';

describe('AllAvatarsComponent', () => {
  let component: AllAvatarsComponent;
  let fixture: ComponentFixture<AllAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAvatarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

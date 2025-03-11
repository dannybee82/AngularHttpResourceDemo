import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsCreateOrUpdateComponent } from './avatars-create-or-update.component';

describe('AvatarsCreateOrUpdateComponent', () => {
  let component: AvatarsCreateOrUpdateComponent;
  let fixture: ComponentFixture<AvatarsCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarsCreateOrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarsCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicSettingsComponent } from './edit-basic-settings.component';

describe('EditBasicSettingsComponent', () => {
  let component: EditBasicSettingsComponent;
  let fixture: ComponentFixture<EditBasicSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBasicSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBasicSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './setting.component';

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 3 controls', () => {
    expect(component.contactForm.contains('newPassword')).toBeTruthy();
    expect(component.contactForm.contains('confirmPassword')).toBeTruthy();
    expect(component.contactForm.contains('theme')).toBeTruthy();
  });

  it('should make the newPassword, confirmPassword, and theme controls required', () => {
    let newPassword = component.contactForm.get('newPassword');
    let confirmPassword = component.contactForm.get('confirmPassword');
    let theme = component.contactForm.get('theme');

    newPassword?.setValue('');
    confirmPassword?.setValue('');
    theme?.setValue('');

    expect(newPassword?.valid).toBeFalsy();
    expect(confirmPassword?.valid).toBeFalsy();
    expect(theme?.valid).toBeFalsy();
  });
});

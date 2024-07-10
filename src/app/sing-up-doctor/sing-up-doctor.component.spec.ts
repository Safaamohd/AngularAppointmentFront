import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpDoctorComponent } from './sing-up-doctor.component';

describe('SingUpDoctorComponent', () => {
  let component: SingUpDoctorComponent;
  let fixture: ComponentFixture<SingUpDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingUpDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingUpDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

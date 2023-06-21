import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ RegistrationComponent ],
      providers: [ FormBuilder ],
    })
  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () =>{
    component.form.controls.name.setValue('Anja');
    component.form.controls.surname.setValue('Petkovic');
    component.form.controls.email.setValue('anja123@gmail.com');
    component.form.controls.password.setValue('Anja123123*');
    component.form.controls.telephoneNumber.setValue('0669024480');
    component.form.controls.address.setValue('Strumicka 6');
    expect(component.form.valid).toBeTruthy();
  });


  it('form should be invalid when missing input', () =>{
    component.form.controls.name.setValue('Anja');
    component.form.controls.surname.setValue('Petkovic');
    component.form.controls.email.setValue('');
    component.form.controls.password.setValue('Anja123123*');
    component.form.controls.telephoneNumber.setValue('0669024480');
    component.form.controls.address.setValue('Strumicka 6');
    expect(component.form.valid).toBeFalsy();
  });

  it('form should be invalid when invalid email input', () =>{
    component.form.controls.name.setValue('Anja');
    component.form.controls.surname.setValue('Petkovic');
    component.form.controls.email.setValue('skajdksajdk');
    component.form.controls.password.setValue('Anja123123*');
    component.form.controls.telephoneNumber.setValue('0669024480');
    component.form.controls.address.setValue('Strumicka 6');
    expect(component.form.valid).toBeFalsy();
  });


  it('form should be invalid when no input', () =>{
    component.form.controls.name.setValue('');
    component.form.controls.surname.setValue('');
    component.form.controls.email.setValue('');
    component.form.controls.password.setValue('');
    component.form.controls.telephoneNumber.setValue('');
    component.form.controls.address.setValue('');
    expect(component.form.valid).toBeFalsy();
  });

});



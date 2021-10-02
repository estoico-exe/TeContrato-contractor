import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  registerForm: FormGroup = this.formBuilder.group({
    fullName: ['', { validators: [Validators.required], updateOn: 'change'}],
    email: ['', { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    phone: ['', { updateOn: 'change'}],
    password: ['', { validators: [Validators.required, Validators.minLength(5)], updateOn: 'change'}],
    role: ['jobSeeker', { validators: [Validators.required], updateOn: 'change'}]
  });



  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setPhoneValidation();
  }

  //Dynamic validation
  setPhoneValidation(){
    const phoneControl = this.registerForm.get('phone');
    //default validations
    phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);

    //validations based on role
    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      if (role == 'jobSeeker') {
        phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
      } else if (role == 'employee') {
        phoneControl?.setValidators([Validators.pattern('^[0-9]*$')]);
      }
      phoneControl?.updateValueAndValidity();

    })
  }

  submitForm() {
    console.log(this.registerForm.valid);
    this.submitted = true;
  }

}


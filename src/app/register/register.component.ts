import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder,  FormControl, FormGroup, Validators} from '@angular/forms';
import {promise} from 'selenium-webdriver';
import {Observable} from 'rxjs/Observable';
import {setTimeout} from 'timers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  genders = ['male', 'female'];
  registerForm: FormGroup;
  forbiddenUsername = ['chris', 'ana'];
  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'gender': new FormControl('male'),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forBiddenEmails),
        'username': new FormControl(null, [Validators.required, this.forbindeenNames.bind(this)]),
        'contact': new FormControl(null, Validators.required),
        'address': new FormControl(null, [Validators.required, Validators.min('10')]),
        'city': new FormControl(null, Validators.required),
        'hobbies': new FormArray([])
    });

    /*this.registerForm.valueChanges.subscribe(
       (value) => console.log(value)
       );*/

     this.registerForm.statusChanges.subscribe(
        (status) => console.log(status)
        );

     this.signupForm.setValue({
         'userData': {
             'username': 'max',
             'email': 'max@test.com'
         }
     });
  }
  onSubmit() {
      console.log(this.registerForm.value);
  }

  onAddHobby() {
      const control = new FormControl(null, Validators.required);
        (<FormArray>this.registerForm.get('hobbies')).push(control);
  }
  /*this is the custom validation to make*/
  forbindeenNames (control: FormControl): {[s: string]: boolean} {
      if (this.forbiddenUsername.indexOf(control.value) !== -1) {
        return {'nameIsForbidden': true};
      }
      return {'nameIsForbidden': false};
  }

  forBiddenEmails (control: FormControl): promise<any> | Observable<any> {
      const promise = new promise<any>((resolve, reject) => {
        setTimeout(() => {
            if (control.value === 'test@test.com') {
                resolve({'emailIsForbiden': true});
            } else {
               resolve(null);
            }
        } , 1500);
      });
  }
}

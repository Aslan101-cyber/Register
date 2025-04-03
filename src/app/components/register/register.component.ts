import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerform: FormGroup = new FormGroup({
    "name": new FormControl (null),
    "email": new FormControl (null),
    "password": new FormControl (null),
    "rePassword": new FormControl (null),
    "phone": new FormControl (null),
  })
}

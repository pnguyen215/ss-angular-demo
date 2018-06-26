import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup.service';
import { MessageObject } from '../../model/MessageObject';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: User;
  constructor(
    private router: Router, private signupService: SignupService, private _route: Router
  ) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      username: '',
      password: ''
    }
  }
  createUser(form: NgForm) {

    this.signupService.createUser(form.value)
      .subscribe((data: any) => {
        const res = data as MessageObject;
        if (res) {
          alert("Account available: " + res.data)
          this.resetForm(form);
          this._route.navigate(['/login']);
        }
        else {
          alert("Technical issue")

        }
      });
  }
}



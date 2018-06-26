import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { MessageObject } from '../../model/MessageObject';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(
    private router: Router, private signupService: SignupService,
    private _route: Router
  ) { }

  ngOnInit() {

  };
  onloginSubmit(userName, password) {


    this.signupService.loginUser(userName, password)
      .subscribe(data => {
        const res = data as MessageObject;
        if (res) {
          alert(res.data);
          localStorage.setItem('userToken', data.access_token);
          this._route.navigate(['/summary']);
        }
      },
        (err: HttpErrorResponse) => {
          this.isLoginError = true;
        });
  }

}

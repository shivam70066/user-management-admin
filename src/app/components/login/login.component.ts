import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LoginResponseData } from '../../../interfaces/interfaces';
// import { setRole } from '../../states/roleState/role.actions';
// import { AppState } from '../../states/app.state';
// import { Store } from '@ngrx/store';


interface response {
  status: number,
  msg: string,
  token: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatRadioModule, HttpClientModule, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {

  hide: boolean = false;
  authServices: AuthService = inject(AuthService);

  constructor(private builder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) {
      this.isLogin();
    }

  userform = this.builder.group({
    email: this.builder.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    password: this.builder.control('', Validators.required)
  });

  login() {
    this.authServices.authLogin(this.userform.value).subscribe({
      next: (resp: LoginResponseData) => {
        this.router.navigate(['../users']);
        localStorage.setItem('token', "Bearer "+resp.token);
      },
      error: (error) => {
        if (error.status == 401) {
          this.showError();
          return
        }
        alert("Server issue")
      }
    })
  }


  showError() {
    this.toastr.error('Wrong credentials!');
  }

  isLogin(){
    if(localStorage.getItem("token")){
      this.router.navigate(['../users']);
    }
  }

}


import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [NavbarComponent,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatRadioModule,
    HttpClientModule, MatIconModule, RouterLink,MatSelectModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  hide: boolean = false;

  userServices : UsersService = inject(UsersService);

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService) {

  }
  userform = this.builder.group({
    name: this.builder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    email: this.builder.control('', [Validators.required, Validators.email],),
    password: this.builder.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    number: this.builder.control('', [Validators.required, Validators.pattern('.{10,10}')]),
    gender: new FormControl('male', [Validators.required]),
    role_slug: this.builder.control('',[Validators.required]),
  });


  valid: boolean = false;


  save() {
    if(this.userform.value.name?.trim()==""){
      this.toastr.error("Name Can't be empty");
      return;
    }
    console.log(this.userform.value)

    this.userServices.addUser(this.userform.value).subscribe({
      next: (resp:any)=>{
        console.log(resp)
        if (resp.status == 200) {
          this.toastr.success('User Added');
          this.router.navigate(['../users']);

          const data={
            name: this.userform.value.name,
            email: this.userform.value.email,
            password: this.userform.value.password
          }

          this.http.post('http://localhost:3000/mailer/reg_temp_backend',data).subscribe(
            response=>{
              console.log(response)
            }
          );
        }
      },error:(error:any)=>{
        if (error.status == 403) {
          this.showEmailAlreadyRegisterd();
          this.valid = true;
        }
        console.error('Error sending data:', error);
      }
    })
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken.');

  }
}

import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AppState } from '../../../states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectID } from '../../../states/roleState/role.selector';
import { UsersService } from '../../../services/users.service';
import { ChangePasswordData } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-change-password',
  standalone: true,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  imports: [NavbarComponent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatRadioModule, HttpClientModule, RouterLink, MatIconModule]
})
export class ChangePasswordComponent {

  hide: boolean = false;
  hide2: boolean = false;
  id$?: Observable<number>;
  id: number = -1;
  userServices: UsersService = inject(UsersService);
  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>) {
  }

  userform = this.builder.group({
    oldPassword: this.builder.control('', [
      Validators.required
    ]),
    newPassword: this.builder.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  });


  changePassword() {
    this.id$ = this.store.select(selectID);
    this.id$.subscribe((value) => {
      this.id = value;
    })

    this.userServices.changePassword(this.userform.value,this.id).subscribe({
      next: (resp) => {
        this.toastr.success('Password changed successfully');
        this.router.navigate(['../users']);
      },error:(error)=>{
        this.toastr.error('Wrong credentials!');
      }
    })
  }
}

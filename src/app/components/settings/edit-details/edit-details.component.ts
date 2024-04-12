import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from "../../../services/users.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../states/app.state";
import { selectID } from "../../../states/roleState/role.selector";

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, RouterLink, RouterLinkActive,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule, MatIconModule, RouterLink, MatSelectModule],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss'
})
export class EditDetailsComponent implements OnInit {
  isloading = true;
  id?: any;
  id$?: Observable<number>;
  httpClient = inject(HttpClient);
  usersServices : UsersService = inject(UsersService);
  userData?: any = null;
  showData: any;
  userform?: any
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id$ = this.store.select(selectID);
    this.id$.subscribe((value) => {
      this.id = value;
    })
    this.fetchData()
  }

  fetchData() {


    this.usersServices.fetchUserDetails(this.id).subscribe({next:(resp)=>{
      this.userData = resp;
      this.isloading = false;
      this.userform = this.builder.group({
        name: this.builder.control(this.userData.data.user_name, [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
        email: this.builder.control(this.userData.data.user_email, [Validators.required, Validators.email],),
        number: this.builder.control(this.userData.data.user_number, [Validators.required, Validators.pattern('.{10,10}')]),
      });
    },
  error:(error)=>{
    if(error.status==404){
      this.toastr.error(error.error.msg)
      this.router.navigateByUrl('/users');
    }
  }})
  }

  convertTimestampToDateTime(timestamp: string | number | Date) {
    if (timestamp == null) {
      return "N/A"
    }
    const dateTimeUTC = new Date(timestamp);
    return dateTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  hide: boolean = false;

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router,
    private toastr: ToastrService,private activatedRoute: ActivatedRoute,
    private store: Store<AppState>) {
  }


  valid: boolean = false;


  save() {
    if(this.userform.value.name?.trim()==""){
      this.toastr.error("Name Can't be empty");
      return;
    }
    this.usersServices.updateUser(this.id, this.userform.value).subscribe(
      (response:any) => {
        if(response.status == 401){
          this.toastr.error('Session Expired');
          localStorage.clear()
          this.router.navigate(['../login']);
        }
        if (response.status == 200) {
          this.registered();
          this.router.navigate(['../users']);
        }
        if (response.status == 400) {
          this.showEmailAlreadyRegisterd();
          this.valid = true;
        }

      },
      error => {
        if(error.status ==409){
          this.showEmailAlreadyRegisterd();
        }
        console.error('Error data:', error);
      }
    );
  }

  registered() {
    this.toastr.success('Details updated');
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken');
  }
}

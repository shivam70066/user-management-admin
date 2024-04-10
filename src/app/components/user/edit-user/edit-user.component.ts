import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  imports: [NavbarComponent, HttpClientModule, RouterLink, RouterLinkActive,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatRadioModule,
    HttpClientModule, MatIconModule, RouterLink, MatSelectModule]
})
export class EditUserComponent {
  isloading = true;
  id?: any;
  httpClient = inject(HttpClient);
  userData?: any = null;
  showData: any;
  userform?: any

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = id;
    this.fetchData()
  }

  fetchData() {
    this.httpClient.get("http://localhost:3000/users/" + this.id).subscribe({
      next: (resp: any) => {
        this.userData = resp;
        this.userform = this.builder.group({
          name: this.builder.control(this.userData.data.user_name, [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
          email: this.builder.control(this.userData.data.user_email, [Validators.required, Validators.email],),
          number: this.builder.control(this.userData.data.user_number, [Validators.required, Validators.pattern('.{10,10}')]),
          gender: new FormControl(this.userData.data.user_gender, [Validators.required]),
          roleID: this.builder.control(this.userData.data.user_role_id, [Validators.required]),

        });
      },error:(error)=>{
        console.log(error.status)
        if(error.status==400){
          this.router.navigate(['../users'])
        }
        return
      }
    });

    // (data: any) => {
    //   this.userData = data;
    //   console.log(this.userData.data)
    //   this.userform = this.builder.group({
    //     name: this.builder.control(this.userData.data.user_name, [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    //     email: this.builder.control(this.userData.data.user_email, [Validators.required, Validators.email],),
    //     number: this.builder.control(this.userData.data.user_number, [Validators.required, Validators.pattern('.{10,10}')]),
    //     gender: new FormControl(this.userData.data.user_gender, [Validators.required]),
    //     roleID: this.builder.control(this.userData.data.user_role_id, [Validators.required]),

    //   });
    // }
    this.isloading = false;
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
    private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
  }


  valid: boolean = false;


  save() {
    console.log(this.userform)
    if (this.userform.value.name?.trim() == "") {
      this.toastr.error("Name Can't be empty");
      return;
    }
    // this.http.put<response>('http://localhost:8000/user/' + this.id, this.userform.value).subscribe(
    //   response => {
    //     const message = response.msg;
    //     const status = response.status;
    //     console.log(response.status)
    //     if (response.status == 401) {
    //       this.toastr.error('Session Expired');
    //       localStorage.clear()
    //       this.router.navigate(['../login']);
    //     }
    //     if (response.status == 200) {
    //       this.registered();
    //       this.router.navigate(['../users']);
    //     }
    //     if (response.status == 400) {
    //       this.showEmailAlreadyRegisterd();
    //       this.valid = true;
    //     }

    //   },
    //   error => {
    //     console.error('Error sending data:', error.error.msg);
    //     alert(error.error.msg);
    //   }
    // );
  }

  registered() {
    this.toastr.success('Details updated');
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken');
  }
}

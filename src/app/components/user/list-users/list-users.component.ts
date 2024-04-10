
import { NavbarComponent } from "../../navbar/navbar.component";
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { AsyncPipe, JsonPipe } from '@angular/common';
import Swal from 'sweetalert2'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { UsersService } from "../../../services/users.service";
import { response } from "express";
import { usersData } from "../../../../interfaces/interfaces";
import { AppState } from "../../../states/app.state";
import { Store } from "@ngrx/store";
import { selectID, selectRole } from "../../../states/roleState/role.selector";
import { setID, setRole } from "../../../states/roleState/role.actions";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-list-users',
  standalone: true,
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  imports: [NavbarComponent, HttpClientModule, MatFormFieldModule, MatInputModule, MatTableModule, RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
    MatIconModule,
    MatButtonModule,
    AsyncPipe],

})
export class ListUsersComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.authServices.me().subscribe({
      next: (resp:any)=>{
        this.store.dispatch(setRole({ role_slug: resp.data.role_slug }));
        this.store.dispatch(setID({ id: resp.data.id }));
      }
    })
    this.roleName$ = this.store.select(selectRole)
    this.id$ = this.store.select(selectID)
  }

  id$?: Observable<number>;
  roleName$?: Observable<string>;
  isloading = true;
  dataService = inject(UsersService)
  authServices: AuthService= inject(AuthService);
  msg?: number;
  fullDataSize!: number;
  start: number = 0;
  next: number = 10;
  showData: any[] = [];
  data: any = 1;

  pageIndex: number = 0;
  pagePerItem: number = 10;
  searchTerm: string = "";
  sortBy: string = "user_created_at";
  sortOrder: string = "asc";
  value = '';
  debounceTimeout: any;


  setRole() {
    this.store.dispatch(setRole({ role_slug: 'changed' }));
  }

  setID() {
    this.store.dispatch(setID({ id: 1 }))
  }



  search() {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.searchTerm = this.value;
      this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder);
    }, 500); // Adjust debounce time as needed
    this.pageIndex = 0
  }

  clearSearch() {
    this.searchTerm = "";
    this.value = "";
    this.getData(0, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)

  }

  newData: any;

  ngOnInit(): void {
    this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)
  }

  getData(pageIndex: number,
    pagePerItem: number,
    searchTerm: string,
    sortBy: string,
    sortOrder: string): void {
    this.dataService.fetchUsers(pageIndex,
      pagePerItem,
      searchTerm,
      sortBy,
      sortOrder).subscribe({
        next: (response: usersData) => {
          this.data = response;
          this.msg = this.data.status;
          console.log(response)
          if (this.msg != 200) {
            this.showError();
          }
          this.newData = this.data.data;
          this.length = this.data.count;
          this.isloading = false
        },
        error: (error) => {
          if (error.status == 401) {
            this.showError();
            return
          }
          console.log("error fetching data");
        }
      })
  }

  length?: number;
  pageSize: number = 5;
  pageSizeOptions = [2, 5, 10];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;

    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isloading = true;
    this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder)

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }




  delete(userId: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId).subscribe({
      next: () => {
        this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder);
      },
      error: (error) => {
        console.error('Error in deleting the user:', error);
      }
    });
  }

  showError() {
    this.toastr.error('Session Expired');
    localStorage.clear()
    this.router.navigate(['../login']);
  }

  convertTimestampToDateTime(timestamp: string | number | Date) {
    if (timestamp == null) {
      return "N/A"
    }
    const dateTimeUTC = new Date(timestamp);
    return dateTimeUTC.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  sort(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = sortBy;
      this.sortOrder = "asc";
    }
    this.getData(this.pageIndex, this.pageSize, this.searchTerm, this.sortBy, this.sortOrder);
  }

}

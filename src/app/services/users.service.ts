import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { usersData } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient: HttpClient = inject(HttpClient);

  fetchUsers(
    pageIndex: number,
    pagePerItem: number,
    searchTerm: string,
    sortBy: string,
    sortOrder: string) {
    return this.httpClient.get<usersData>("http://localhost:3000/users?sortBy="
      + sortBy +
      "&sortOrder=" + sortOrder +
      "&searchTerm=" + searchTerm +
      "&pageIndex=" + pageIndex +
      "&pagePerItem=" + pagePerItem);
  }

  fetchUserDetails(id:number){
    return this.httpClient.get("http://localhost:3000/users/"+id);
  }


  deleteUser(id:number){
    return this.httpClient.delete("http://localhost:3000/users/"+id);
  }

  updateUser(id:number,data:any){
    return this.httpClient.put("http://localhost:3000/users/"+id,data);
  }



}

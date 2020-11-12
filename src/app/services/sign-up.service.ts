import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/backend.constant';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  public createNewUser(userData: IUser): Observable<object> {
    return this.http.post(`${API.backendLink}users`, userData);
  }
}

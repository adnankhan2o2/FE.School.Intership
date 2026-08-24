import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7216/api/Auth';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  getUserDetails(): Observable<any> {

    return this.http.get(
      `${this.baseUrl}/user-details`,
      { headers: this.getAuthHeaders() }
    );

  }

  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/change-password`,
      passwordData,
      { headers: this.getAuthHeaders() }
    );

  }

}

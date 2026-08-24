import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'https://localhost:7216/api/Auth';

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/signup`,
      user
    );
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      user
    );
  }
}

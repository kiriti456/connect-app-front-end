import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  public loggedIn = false;
  private isAuthenticated = false;
  private userName!: string;
  private storage: Storage | null = null;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      this.storage = localStorage;
    }
  }

  setUserName(username: string): void {
    this.userName = username;
  }

  getUserName() : string{
    return this.userName;
  }

  getCurrentUserId(): Observable<number> {
    console.log("Current userName ", this.userName);
    return this.http.get<number>(`${this.apiUrl}/current-user/${this.userName}`);
  }

  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  loginForAuth(): void{
    this.isAuthenticated = true;
  }

  // Local Storage
  set(key: string, value: any): void {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
    }
    console.log(this.storage);
  }

  get(key: string): any {
    console.log(this.storage);
    if (this.storage) {
      const storedValue = this.storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
  }

  remove(key: string): void {
    console.log(this.storage);
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
   // Cache code ends here

  login(user: any): Observable<string> {
    this.loggedIn = true;
    return this.http.get<string>(`${this.apiUrl}/login`, {
      params: {
        username: user.username,
        password: user.password
      },
      responseType: 'text' as 'json',
    }).pipe(
      catchError((error) => {
        this.loggedIn = false;
        console.error('Login failed', error);
        return of('not found');
      })
    );
  }
  
  logout(): void {
    this.loggedIn = false;
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAuthenticatedMethod(): boolean {
    return this.isAuthenticated;
  }

  searchUsers(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/search-users?query=${query}`;
    return this.http.get<any[]>(url);
  }

}
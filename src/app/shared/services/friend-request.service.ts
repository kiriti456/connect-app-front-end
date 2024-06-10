import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../friend-request/friend-request';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private apiUrl = 'http://localhost:8080/api/friends';

  constructor(private http: HttpClient) {}

  sendFriendRequest(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/send-request`, request);
  }

  acceptFriendRequest(requestId: number): Observable<void> {
    console.log(requestId);
    return this.http.post<void>(`${this.apiUrl}/accept-request?requestId=${requestId}`,'');
  }

  getPendingFriendRequests(receiverUserid: number): Observable<FriendRequest[]> {
    const url = `${this.apiUrl}/pending-requests?receiverUserId=${receiverUserid}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<FriendRequest[]>(url, { headers });
  }

}

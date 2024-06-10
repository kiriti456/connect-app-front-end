import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/add`, post);
  }

  getUserPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
  }

  getFriendsPublicPosts(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/friends-public/${userId}`;
    return this.http.get<any[]>(url);
  }

}

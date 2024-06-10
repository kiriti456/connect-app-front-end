import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../posts.service';
import { Post } from '../../shared/models/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  
  userId!: number;
  userPosts!: Post[];
  private userName: string | undefined;

  constructor(private route: ActivatedRoute, private postService: PostsService, private authService: AuthService) {}
  
  setUserName(username: string): void {
    this.userName = username;
  }

  ngOnInit(): void {
    this.userId = this.authService.get("userId");
    if(this.userId == null){
      console.log("inside if");
      this.authService.getCurrentUserId().subscribe(
        (id) => {
          if(id === 0){
            console.log("No Posts");
          }
          else{
            this.userId = id;
            console.log("User ID in on init : ",this.userId);
            this.loadUserPosts();
          }
          this.authService.set("userId", id);
        },
        (error) => {
          console.error('Error getting current user ID:', error);
        }
      );
    }
    else{
      this.loadUserPosts();
    }
    console.log("User Id in post-list : ", this.authService.get("userId"));
  }

  loadUserPosts(): void {
    console.log("User Id in loadUserPosts ",this.userId);
    this.postService.getFriendsPublicPosts(this.userId).subscribe(
      (posts) => {
        this.userPosts = posts;
      },
      (error) => {
        console.error('Error loading user posts', error);
      }
    );
  }

}

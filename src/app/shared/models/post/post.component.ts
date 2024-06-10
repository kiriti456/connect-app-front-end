import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../posts/posts.service';
import { Post } from '../post';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  userId!: number;
  userPosts!: Post[];
  private userName: string | undefined;

  constructor(private route: ActivatedRoute, private postService: PostsService, private authService: AuthService) {}
  
  setUserName(username: string): void {
    this.userName = username;
  }

  ngOnInit(): void {
    this.userId = this.authService.get("userId");
    console.log("UserId in posts component =========== ", this.userId);
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    console.log("User Id in loadUserPosts ",this.userId);
    this.postService.getUserPosts(this.userId).subscribe(
      (posts) => {
        this.userPosts = posts;
      },
      (error) => {
        console.error('Error loading user posts', error);
      }
    );
  }
}

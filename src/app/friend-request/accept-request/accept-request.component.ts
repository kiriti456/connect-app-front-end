import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../shared/services/friend-request.service';
import { AuthService } from '../../auth/auth.service';
import { FriendRequest } from '../friend-request';

@Component({
  selector: 'app-accept-request',
  templateUrl: './accept-request.component.html',
  styleUrl: './accept-request.component.css'
})
export class AcceptRequestComponent implements OnInit {
  pendingRequests: FriendRequest[] = [];

  constructor(private friendRequestService: FriendRequestService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests(): void {
    this.friendRequestService.getPendingFriendRequests(this.authService.get("userId"))
      .subscribe(
        (requests) => {
          this.pendingRequests = requests;
        },
        (error) => {
          console.error('Error fetching pending friend requests', error);
        }
      );
  }

  acceptFriendRequest(requestId: number): void {
    this.friendRequestService.acceptFriendRequest(requestId).subscribe(
      () => {
        console.log('Friend request accepted');
        this.getPendingRequests();
      },
      (error) => {
        console.error('Error accepting friend request:', error);
      }
    );
  }
}
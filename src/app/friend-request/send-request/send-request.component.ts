import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FriendRequestService } from '../../shared/services/friend-request.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrl: './send-request.component.css'
})
export class SendRequestComponent implements OnInit {
  senderId: number | undefined;

  searchForm!: FormGroup;
  searchResults$!: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private friendRequestService: FriendRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });
  
    const searchControl = this.searchForm.get('searchQuery');
  
    if (searchControl) {
      this.searchResults$ = searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query.trim() === '') {
            return of([]);
          }
          return this.authService.searchUsers(query);
        })
      );
    }
  }

  sendFriendRequest(receiverId: number): void {
    // this.authService.getCurrentUserId().subscribe(
    //   (userId) => {
    //     this.senderId = userId;
    //     const request = {
    //       sender: { id: this.senderId },
    //       receiver: { id: receiverId },
    //     };
        this.senderId = this.authService.get("userId");
        const request = {
          sender: { id: this.senderId },
          receiver: { id: receiverId },
        };

        console.log("Sender ID: ", this.senderId);
        console.log("Sending friend request:", request);

        this.friendRequestService.sendFriendRequest(request).subscribe(
          (response) => {
            if(response == null){
              console.log("Friend request already sent");
            }
            else{
              console.log('Friend request sent:', response);
            }
          },
          (error) => {
            console.error('Error sending friend request:', error);
          }
        );
    //   },
    //   (error) => {
    //     console.error('Error getting current user ID:', error);
    //   }
    // );
  }
}
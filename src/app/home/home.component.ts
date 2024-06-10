import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username!: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  selectedTab: string = 'myFeed';

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {}

  onTabChange(index: number): void {
    switch (index) {
      case 0:
        this.selectedTab = 'myFeed';
        break;
      case 1:
        this.selectedTab = 'home';
        break;
      case 2:
        this.selectedTab = 'sendRequests';
        break;
      case 3:
        this.selectedTab = 'acceptRequests';
        break;
      case 4:
        this.selectedTab = 'logout';
        this.router.navigate(['/login']);
        this.authService.clear();
        break;
      default:
        break;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  user;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStateUser().subscribe(a => {
     this.user = a;
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login();
    this.authService.user.subscribe(a => {
      console.log(a);
      this.user = a;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  favs(): void {
    this.router.navigate([`favs/${this.user.id}`]);
  }
  inicio(): void {
    this.router.navigate([``]);
  }


}

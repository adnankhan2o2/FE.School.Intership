import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  constructor(private router: Router) { }

  // =========================
  // LOGOUT
  // =========================
  onLogout() {

    // Remove the JWT token from browser storage
    localStorage.removeItem('token');

    // Remove old user information if it exists
    localStorage.removeItem('user');

    // Send the user back to the login/signup page
    this.router.navigate(['/loginsignup']);
  }
}

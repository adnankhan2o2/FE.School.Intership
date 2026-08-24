import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.css'
})
export class LoginSignup {

  activeform: 'signup' | 'login' = 'login';

  username = '';
  number = '';
  password = '';
  city = '';

  signupMessage = '';
  signupMessageType: 'success' | 'error' = 'success';

  loginMessage = '';
  loginMessageType: 'success' | 'error' = 'success';

  constructor(
    private auth: Auth,
    private router: Router
  ) { }


  // =========================
  // CHANGE LOGIN / SIGNUP
  // =========================
  toggleform(form: 'signup' | 'login') {

    this.activeform = form;

    this.signupMessage = '';
    this.loginMessage = '';

    // Only clear the fields when manually changing forms
    this.username = '';
    this.number = '';
    this.password = '';
    this.city = '';
  }


  // =========================
  // SIGNUP
  // =========================
  signup() {

    // Remove old signup message
    this.signupMessage = '';

    const user = {
      username: this.username,
      number: this.number,
      password: this.password,
      city: this.city
    };

    console.log('Sending signup data:', user);

    this.auth.signup(user).subscribe({

      // SUCCESS
      next: (response: any) => {

        console.log('SIGNUP SUCCESS:', response);

        // Store success message for LOGIN page
        this.loginMessage = response.message || 'Signup successful! Please login.';
        this.loginMessageType = 'success';

        // Clear signup fields AFTER successful signup
        this.username = '';
        this.number = '';
        this.password = '';
        this.city = '';

        // Immediately open LOGIN
        this.activeform = 'login';
      },

      // ERROR
      error: (error: any) => {

        console.log('SIGNUP ERROR:', error);
        console.log('Status:', error.status);
        console.log('Backend response:', error.error);

        this.signupMessage =
          error.error?.message ||
          'Signup failed!';

        this.signupMessageType = 'error';
      }

    });
  }


  // =========================
  // LOGIN
  // =========================
  login() {

    // Remove old login message
    this.loginMessage = '';

    const user = {
      username: this.username,
      password: this.password
    };

    console.log('Sending login data:', user);

    this.auth.login(user).subscribe({

      // SUCCESS
      next: (response: any) => {

        console.log('LOGIN SUCCESS:', response);

        this.loginMessage =
          response.message || 'Login successful!';

        this.loginMessageType = 'success';

        // Save JWT
        if (response.token) {

          localStorage.setItem(
            'token',
            response.token
          );

          // Save logged-in user's information
          if (response.user) {

            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );
          }

          console.log('JWT token saved');
          console.log('User data saved');

          // Go to dashboard
          this.router.navigate(['/dashboard']);
        }
      },

      // ERROR
      error: (error: any) => {

        console.log('LOGIN ERROR:', error);
        console.log('Status:', error.status);
        console.log('Backend response:', error.error);

        this.loginMessage =
          error.error?.message ||
          'Invalid username or password';

        this.loginMessageType = 'error';
      }

    });
  }
}

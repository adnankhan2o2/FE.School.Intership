import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user_details.html',
  styleUrl: './user_details.css'
})
export class UserDetails implements OnInit {

  username: string = '';
  city: string = '';
  number: string = '';

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showPasswordForm: boolean = false;

  message: string = '';
  messageType: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {

    this.userService.getUserDetails().subscribe({

      next: (response: any) => {

        console.log('BACKEND RESPONSE:', response);

        this.username = response.username;
        this.city = response.city;
        this.number = response.number;

      },

      error: (error: any) => {

        console.error('GET USER DETAILS ERROR:', error);

        if (error.status === 401) {
          this.message = 'Session expired. Please log in again.';
        } else {
          this.message = 'Unable to load user details.';
        }

        this.messageType = 'error';

      }

    });

  }

  showChangePassword(): void {
    this.showPasswordForm = true;
  }

  changePassword(): void {

    this.message = '';
    this.messageType = '';

    if (!this.currentPassword) {
      this.message = 'Please enter your current password.';
      this.messageType = 'error';
      return;
    }

    if (!this.newPassword) {
      this.message = 'Please enter a new password.';
      this.messageType = 'error';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'New passwords do not match.';
      this.messageType = 'error';
      return;
    }

    const passwordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.userService.changePassword(passwordData).subscribe({

      next: (response: any) => {

        this.message = 'Password changed successfully.';
        this.messageType = 'success';

        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';

      },

      error: (error: any) => {

        console.error('PASSWORD CHANGE ERROR:', error);

        this.message = 'Unable to change password.';
        this.messageType = 'error';

      }

    });

  }

}

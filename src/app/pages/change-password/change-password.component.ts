import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ToastModule, RippleModule, ToastModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  providers: [MessageService]
})
export class ChangePasswordComponent {
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''

  constructor(private _authService: AuthService, private messageService: MessageService) {
  }
  updateForm: FormGroup = new FormGroup({

    currentPassword: new FormControl('', [Validators.pattern(new RegExp('^[A-Za-z0-9@]{6,12}$'))]),
    password: new FormControl('', [Validators.pattern(new RegExp('^[A-Za-z0-9@]{6,16}$'))]),
    rePassword: new FormControl(''),
  }, { validators: this.passwordMatchValidator })

  get currentPasswordControl(): FormControl {
    return this.updateForm.get('currentPassword') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.updateForm.get('password') as FormControl;
  }

  get rePasswordControl(): FormControl {
    return this.updateForm.get('rePassword') as FormControl;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) {
      return null;
    }

    if (password.value !== rePassword.value) {
      rePassword.setErrors({ passwordMismatch: true });
    } else {
      rePassword.setErrors(null);
    }

    return null;
  }



  updateUserInformation(event: Event) {
    event.preventDefault()
    console.log(this.updateForm);
    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
      this.isLoading = false
    } else {
      this.isLoading = true
      this.errorMessage = ''

      this._authService.changePassword(this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'password updated',
            detail: 'password updated.'
          });
          console.log(res);
          this.isLoading = false
          this.errorMessage = (res as any).message
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'failed updated password',
            detail: 'failed updated password.'
          });
          console.log(err);
          this.errorMessage = err.error.message
          this.isLoading = false
        }
      })
    }
  }

}

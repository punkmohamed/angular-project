import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  information: any
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''


  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5), Validators.maxLength(22)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.min(11)]),

  })

  get nameControl(): FormControl {
    return this.updateForm.get('name') as FormControl;
  }
  get emailControl(): FormControl {
    return this.updateForm.get('email') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.updateForm.get('phone') as FormControl;
  }

  constructor(private _authService: AuthService) {

  }

  updateUserInformation(event: Event) {
    event.preventDefault()
    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._authService.updateUserInformation(this.updateForm.value).subscribe({
        next: (res) => {

          this.isLoading = false
          this.errorMessage = (res as any).message
        },
        error: (err) => {

          this.errorMessage = err.error.message
          this.isLoading = false
        }
      })
    }
  }
}

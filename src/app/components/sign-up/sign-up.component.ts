import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public signUpForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9 ]{12}')]],
    address: this.fb.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: ['']
    })
  });

  get name() {
    return this.signUpForm.get('name');
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  constructor(private signUpService: SignUpService,
              private fb: FormBuilder,
              private router: Router) { }

  public ngOnInit(): void {

  }

  public onSubmit(): void {
    this.sub = this.signUpService.createNewUser(this.signUpForm.value).subscribe(user => {
      this.router.navigate(['/todo']);
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

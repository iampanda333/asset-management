import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    serverErrorMessages = '';
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.userService.deleteToken();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.login(this.loginForm.value).subscribe(
            res => {
                this.userService.setToken(res['token']);
                this.router.navigateByUrl('/assets');
                this.loading = false;
            },
            err => {
                this.serverErrorMessages = err.error.message;
                if (err.authenticate === false && !this.serverErrorMessages) {
                    this.serverErrorMessages = 'Invalid credentials';
                }
                this.loading = false;
            }
        );
    }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { UsersService } from './../../shared/services/users.service';
import { AuthService } from './../../shared/services/auth.service';

import { User } from './../../shared/models/user.model';
import { Message } from './../../shared/models/message.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	message: Message;

	constructor(
		private usersService: UsersService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
		) { }

	ngOnInit() {
		this.form = new FormGroup({
			'email': new FormControl(null, [Validators.required, Validators.email]),
			'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
		});
		this.message = new Message('danger', '');
		this.route.queryParams
		.subscribe((params: Params) => {
			if (params['nowCanLogin']) {
				this.showMessage({
          text: 'Тепер можна зайти в систему',
          type: 'success'
        });
			}
		});
	}

	private showMessage(message: Message) {
		this.message = message;
		window.setTimeout(() => {
			this.message.text = '';
		}, 5000);
	}

	onSubmit() {
		const formData = this.form.value;

		this.usersService.getUserByEmail(formData.email)
		.subscribe((user: User) => {
			if (user) {
				if (user.password === formData.password) {
					this.authService.login();
					this.router.navigate(['/system', 'bill']);
					window.localStorage.setItem('user', JSON.stringify(user));
					this.message.text = '';
				} else {
					this.showMessage({
            text: 'Пароль не правильний',
            type: 'danger'
          });
				}
			} else {
				this.showMessage({
          text: 'Такого користувача не існує',
          type: 'danger'
        });
			}
		});
	}
}

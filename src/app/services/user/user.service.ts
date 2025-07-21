import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private toast: ToastService) {}

  login(user: User) {
    console.log(JSON.stringify(user));
    console.log(environment.api_url + 'login');
    return fetch(environment.api_url + 'login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == "success") {
          let primeiro_nome = String(response.user.nome).split(' ')[0];
          sessionStorage.setItem('token', response.user.token);
          sessionStorage.setItem('username', primeiro_nome);
          return response;
        }
      })
      .catch((error) => {this.toast.presentToast('error', error);});
  }
}

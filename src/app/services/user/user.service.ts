import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private toast: ToastService) { }

  login(user: User){
      return fetch(environment.api_url+'login', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${environment.api_token}`
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          sessionStorage.setItem("token", response.token);
        } else {
          this.toast.presentToast(response.status, response.message);
        }
      })
      .catch(error => {
        this.toast.presentToast('error', error);
      })
    }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosed, personOutline } from 'ionicons/icons';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
  ],
})
export class LoginPage implements OnInit {
  user: User = new User('', '');

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {
    addIcons({ personOutline, lockClosed });
  }

  ngOnInit() {}

  async onSubmit() {
    const response = await this.userService.login(this.user);

    if (sessionStorage.getItem('token') && response.status == "success") {
      this.router.navigate(['/clientes']);
    }
  }
}

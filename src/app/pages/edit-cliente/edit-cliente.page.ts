import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ClienteFormComponent } from 'src/app/components/cliente/cliente-form/cliente-form.component';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.page.html',
  styleUrls: ['./edit-cliente.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonButtons,
    RouterLink,
    ClienteFormComponent
  ],
})
export class EditClientePage implements OnInit {
  constructor(
    private clienteService: ClienteService,
    private toast: ToastService,
    private router: Router
  ) {
    addIcons({ arrowBackCircleOutline });
  }

  ngOnInit() {}

  async onSubmit(cliente: any) {
    const response = await this.clienteService.updateCliente(cliente);

    if (response.errors) {
      const primeiroCampo = Object.keys(response.errors)[0];
      const primeiraMensagem = response.errors[primeiroCampo][0];

      this.toast.presentToast('error', primeiraMensagem);
    } else {
      this.toast.presentToast('success', response.message);
      this.router.navigate(['/clientes']);
    }
  }
}

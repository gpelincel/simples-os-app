import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ClienteFormComponent } from 'src/app/components/cliente/cliente-form/cliente-form.component';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.page.html',
  styleUrls: ['./cadastro-clientes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    ClienteFormComponent,
    IonBackButton
  ],
})
export class CadastroClientesPage implements OnInit {
  constructor(
    private clienteService: ClienteService,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  async onSubmit(cliente:any) {
    const response = await this.clienteService.storeCliente(cliente);

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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonButtons,
  IonItemDivider,
  IonLabel,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Cliente } from 'src/app/models/cliente/cliente';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { CEP_MASK, CNPJ_MASK, TELEFONE_MASK } from 'src/app/utils/masks';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate } from '@maskito/core';

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
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonButtons,
    RouterLink,
    IonItemDivider,
    IonLabel,
    MaskitoDirective
  ],
})
export class CadastroClientesPage implements OnInit {
  cliente = new Cliente();
  endereco: any = {};

  cnpjMask = CNPJ_MASK;
  telefoneMask = TELEFONE_MASK;
  cepMask = CEP_MASK;
  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(
    private clienteService: ClienteService,
    private toast: ToastService,
    private router: Router
  ) {
    addIcons({arrowBackCircleOutline});
  }

  ngOnInit() {}

  async onSubmit() {
    const response = await this.clienteService.storeCliente({
      ...this.cliente,
      ...this.endereco,
    });

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

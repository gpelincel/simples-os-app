import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { FormOsComponent } from 'src/app/components/ordem-servico/form-os/form-os.component';
import { Router, RouterLink } from '@angular/router';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-cadastro-os',
  templateUrl: './cadastro-os.page.html',
  styleUrls: ['./cadastro-os.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    FormOsComponent,
    IonButton,
    IonIcon,
    RouterLink,
  ],
})
export class CadastroOsPage implements OnInit {
  constructor(private osService: OrdemServicoService, private toast: ToastService, private router: Router) {
    addIcons({ arrowBackCircleOutline });
  }

  ngOnInit() {}

  async storeOS(ordem_servico: OrdemServico) {

    const response = await this.osService.storeOS(ordem_servico);
    let message = response.message;

    if (response.errors) {
      const primeiroCampo = Object.keys(response.errors)[0];
      message = response.errors[primeiroCampo][0];
    }

    this.toast.presentToast(response.status, message);

    if (response.status == 'success') {
      this.router.navigate(['/ordem-servico']);
    }
  }
}

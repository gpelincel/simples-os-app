import { Component, inject, OnInit } from '@angular/core';
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormOsComponent } from 'src/app/components/ordem-servico/form-os/form-os.component';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-edit-os',
  templateUrl: './edit-os.page.html',
  styleUrls: ['./edit-os.page.scss'],
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
    IonSpinner,
  ],
})
export class EditOsPage implements OnInit {
  id_os: string | null = null;
  route = inject(ActivatedRoute);
  ordem_servico: OrdemServico = new OrdemServico();
  loaded = false;

  constructor(
    private osService: OrdemServicoService,
    private toast: ToastService,
    private router: Router
  ) {
    this.id_os = this.route.snapshot.paramMap.get('id');
    addIcons({ arrowBackCircleOutline });
    this.getOS();
  }

  async getOS() {
    const response = await this.osService.getOSByID(Number(this.id_os));
    this.ordem_servico = response;
    this.loaded = true;
  }

  ngOnInit() {}

  async updateOS(ordem_servico: any) {
    const response = await this.osService.editOS(ordem_servico, this.id_os);
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

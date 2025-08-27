import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonButton,
  IonSpinner,
  IonIcon,
  IonPopover,
  IonBackButton,
  ModalController} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { addIcons } from 'ionicons';
import {
  arrowBackCircleOutline,
  createOutline,
  ellipsisVertical,
  printOutline,
  trashOutline,
} from 'ionicons/icons';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ModalAssinaturaComponent } from 'src/app/components/ordem-servico/modal-assinatura/modal-assinatura-cliente.component';

@Component({
  selector: 'app-info-ordem-servico',
  templateUrl: './info-ordem-servico.page.html',
  styleUrls: ['./info-ordem-servico.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonList,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonItem,
    IonCheckbox,
    IonButton,
    IonSpinner,
    RouterLink,
    IonIcon,
    IonPopover,
    IonBackButton,
  ],
})
export class InfoOrdemServicoPage implements OnInit {
  impressao_fields: any = {
    cnpj_cliente: true,
    telefone_cliente: true,
    email_cliente: true,
    endereco_cliente: true,
    nome_equipamento: true,
    numero_serie: true,
    numero_patrimonio: true,
    id_equipamento: true,
    data_inicio: true,
    data_conclusao: true,
    status: true,
    codigo_compra: true,
    descricao: true,
    nota_fiscal: true,
    items: true,
    valor: true,
    assinatura_tecnico: true,
    assinatura_tecnico_img: null,
    assinatura_cliente: true,
    assinatura_cliente_img: null,
  };
  id_os: any;
  private route = inject(ActivatedRoute);
  ordem_servico!: OrdemServico;
  loaded = false;
  popoverOpen = false;

  constructor(
    private osService: OrdemServicoService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router,
    private modalController: ModalController
  ) {
    this.id_os = this.route.snapshot.paramMap.get('id');
    addIcons({
      arrowBackCircleOutline,
      ellipsisVertical,
      createOutline,
      printOutline,
      trashOutline,
    });
  }

  async ngOnInit() {
    await this.getOS();
  }

  async getOS(){
    this.loaded = false;
    const response = await this.osService.getOSByID(this.id_os);
    this.ordem_servico = response!;
    this.loaded = true;
  }

  async getAssinatura(assinatura: string) {
    const modal_assinatura = await this.modalController.create({
      component: ModalAssinaturaComponent,
      componentProps: {
        ['cargo']: assinatura,
      },
    });

    modal_assinatura.present();

    const { data, role } = await modal_assinatura.onWillDismiss();

    if (role === 'confirm') {
      if (!data) {
        this.toastService.presentToast(
          'error',
          'Preencha a assinatura para confirmar!'
        );
        return;
      }

      const response = await this.osService.assinarOS(
        assinatura,
        data,
        this.id_os
      );
      let message = response.message;

      if (response.errors) {
        const primeiroCampo = Object.keys(response.errors)[0];
        message = response.errors[primeiroCampo][0];
      }

      this.toastService.presentToast(response.status, message);

      await this.getOS();
    } else {
      modal_assinatura.dismiss();
    }
  }

  async imprimirOS() {
    await this.osService.imprimirOS(this.impressao_fields, this.id_os);
  }

  async editOS(id_os: any) {
    this.popoverOpen = false;
    this.router.navigate(['/ordem-servico/update/', id_os]);
  }

  async excluirOS() {
    await this.alertService.presentAlert(
      'Deseja mesmo excluir essa OS?',
      'Ao excluir a OS, ela não poderá ser recuperada!',
      async () => {
        const response = await this.osService.excluirOS(this.id_os);

        if (response.status == 'success') {
          this.toastService.presentToast(response.status, response.message);
          this.router.navigate(['/ordem-servico']);
        } else {
          this.toastService.presentToast(
            'Error',
            'Houve um erro ao tentar excluir a OS'
          );
        }
      }
    );
  }
}

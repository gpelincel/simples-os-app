import { Component, inject, OnInit,  } from '@angular/core';
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
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonSpinner,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from 'src/app/models/cliente/cliente';
import { addIcons } from 'ionicons';
import {
  arrowBackCircleOutline,
  ellipsisVertical,
  ellipsisVerticalOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ClienteDadosComponent } from 'src/app/components/cliente/cliente-dados/cliente-dados.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ListOsComponent } from 'src/app/components/ordem-servico/list-os/list-os.component';
import { Equipamento } from 'src/app/models/equipamento/equipamento';
import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';
import { ListEquipamentoComponent } from 'src/app/components/equipamento/list-equipamento/list-equipamento.component';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.page.html',
  styleUrls: ['./info-cliente.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    RouterLink,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonSegmentView,
    IonSegmentContent,
    ClienteDadosComponent,
    IonSpinner,
    ListOsComponent,
    ListEquipamentoComponent,
    IonBackButton,
  ],
})
export class InfoClientePage implements OnInit {
  cliente!: Cliente;
  id_cliente!: number | string;
  route = inject(ActivatedRoute);
  ordens: OrdemServico[] = [];
  equipamentos: Equipamento[] = [];
  segment_value: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private toastService: ToastService,
    private router: Router,
    private alertService: AlertService
  ) {
    addIcons({
      arrowBackCircleOutline,
      ellipsisVertical,
      createOutline,
      trashOutline,
    });
  }

  async onChange(event: any) {
    this.segment_value = event.detail.value;
    switch (this.segment_value) {
      case 'os':
        if (this.ordens.length <= 0) {
          const ordens = await this.clienteService.getOS(this.id_cliente);
          this.ordens = ordens.map(
            (ordem: OrdemServicoDTO) => new OrdemServico(ordem)
          );
        }
        break;
      case 'equipamento':
        if (this.equipamentos.length <= 0) {
          this.equipamentos = await this.clienteService.getEquipamentos(
            this.id_cliente
          );
        }
        break;
      default:
        break;
    }
  }

  async ngOnInit() {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!;
    this.cliente = await this.clienteService.getByID(this.id_cliente);
  }

  async excluirCliente() {
    await this.alertService.presentAlert(
      'Deseja mesmo excluir esse cliente?',
      'Ao excluir o cliente, ele não poderá ser recuperado!',
      async () => {
        const response = await this.clienteService.excluirCliente(
          this.id_cliente
        );

        if (response.status == 'success') {
          this.toastService.presentToast(response.status, response.message);
          this.router.navigate(['/clientes']);
        } else {
          this.toastService.presentToast(
            'Error',
            'Houve um erro ao tentar excluir o cliente'
          );
        }
      }
    );
  }

  onIonInfinite(event: any) {
    console.log('hello');
    event.target.complete();
  }
}

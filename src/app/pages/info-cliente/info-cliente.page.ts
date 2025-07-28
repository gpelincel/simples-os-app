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
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonSpinner
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Cliente } from 'src/app/models/cliente/cliente';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline, ellipsisVertical, ellipsisVerticalOutline, createOutline, trashOutline } from 'ionicons/icons';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ClienteDadosComponent } from 'src/app/components/cliente/cliente-dados/cliente-dados.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';

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
    IonSpinner
  ],
})
export class InfoClientePage implements OnInit {
  cliente!:Cliente;
  id_cliente!: number | string;
  route = inject(ActivatedRoute);
  ordens: OrdemServico[] = [];

  constructor(private clienteService: ClienteService) {
    addIcons({arrowBackCircleOutline,ellipsisVertical,createOutline,trashOutline});
  }

  onChange(event:any){
    const segment = event.detail.value;

    switch (segment) {
      case "os":
        
        break;
      default:
        break;
    }
  }

  async ngOnInit() {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!;
    this.cliente = await this.clienteService.getByID(this.id_cliente);
  }

  async excluirCliente(){}
}

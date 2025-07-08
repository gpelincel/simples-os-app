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
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';

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
    IonGrid,
    IonRow,
    IonCol
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
  };
  id_os: any;
  private route = inject(ActivatedRoute);
  ordem_servico: OrdemServico = new OrdemServico();
  loaded = false;

  constructor(private osService: OrdemServicoService) {
    this.id_os = this.route.snapshot.paramMap.get('id');
    addIcons({ arrowBackCircleOutline });
  }

  async ngOnInit() {
    this.ordem_servico = await this.osService.getOSByID(this.id_os);
    this.loaded = true;
  }

  async imprimirOS(){
    console.log(this.impressao_fields, this.id_os);
    this.osService.imprimirOS(this.impressao_fields, this.id_os);
  }

  formatToBRL(value: number | null): string {
    if (value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    } else {
      return '';
    }
  }
}

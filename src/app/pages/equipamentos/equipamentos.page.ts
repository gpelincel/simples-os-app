import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonSearchbar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { EquipamentoService } from 'src/app/services/equipamento/equipamento.service';
import { EquipamentoCardComponent } from 'src/app/components/equipamento/equipamento-card/equipamento-card.component';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.page.html',
  styleUrls: ['./equipamentos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonButtons,
    IonSearchbar,
    IonButton,
    IonIcon,
    EquipamentoCardComponent
  ],
})
export class EquipamentosPage implements OnInit {
  equipamentos: any[] = [];

  constructor(private equipamentoService: EquipamentoService) {
    addIcons({ addCircle });
  }

  async searchEquipamento(event: Event){
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value || '';
    this.equipamentos = await this.equipamentoService.getEquipamentos(query);
  }

  async ngOnInit() {
    this.equipamentos = await this.equipamentoService.getEquipamentos();
  }
}

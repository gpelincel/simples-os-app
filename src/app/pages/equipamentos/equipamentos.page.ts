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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
    EquipamentoCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class EquipamentosPage implements OnInit {
  equipamentos: any[] = [];
  page = 1;
  stopLoading = false;

  constructor(private equipamentoService: EquipamentoService) {
    addIcons({ addCircle });
  }

  async searchEquipamento(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value || '';
    this.page = 1;
    this.equipamentos = await this.equipamentoService.searchEquipamentos(query);
  }

  onIonInfinite(event: any){
    this.renderEquipamentos(this.page++);
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async renderEquipamentos(page:any){
    const next_eqp = await this.equipamentoService.getEquipamentos(page);
    if (next_eqp) {
      this.equipamentos = this.equipamentos.concat(next_eqp);
    } else {
      this.stopLoading = true;
    }
  }

  ngOnInit() {
    this.renderEquipamentos(this.page);
  }
}

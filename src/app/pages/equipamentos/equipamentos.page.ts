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
  IonIcon,
  IonFab,
  IonFabButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { EquipamentoService } from 'src/app/services/equipamento/equipamento.service';
import { EquipamentoCardComponent } from 'src/app/components/equipamento/equipamento-card/equipamento-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Equipamento } from 'src/app/models/equipamento/equipamento';

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
    IonButtons,
    FormsModule,
    IonMenuButton,
    IonSearchbar,
    IonIcon,
    EquipamentoCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    RouterLink,
  ],
})
export class EquipamentosPage implements OnInit {
  equipamentos: Equipamento[] = [];
  next_page: String | null = null;
  stopLoading = false;
  loaded = false;

  constructor(private equipamentoService: EquipamentoService) {
    addIcons({ add });
  }

  async searchEquipamento(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value;
    this.equipamentos = [];
    this.next_page = null;
    this.stopLoading = false;
    this.loadEquipamentos(this.next_page, query == '' ? null : query);
  }

  async onIonInfinite(event: any) {
    if (this.equipamentos.length > 0) {
      await this.loadEquipamentos(this.next_page);
      event.target.complete();
    }
  }

  async loadEquipamentos(next_page: any = null, query: string | null = null) {
    const response = await this.equipamentoService.getEquipamentos(
      next_page,
      query
    );
    if (next_page == null) {
      if (this.equipamentos.length == 0) {
        this.equipamentos = response.data;
        this.stopLoading = false;
      } else {
        this.stopLoading = true;
      }
    } else {
      this.equipamentos = [...this.equipamentos, ...response.data];
    }
    this.loaded = true;
    this.next_page = response.next_page_url;
  }

  ngOnInit() {
    this.loadEquipamentos();
    console.log(this.equipamentos);
    console.log(this.loaded);
  }
}

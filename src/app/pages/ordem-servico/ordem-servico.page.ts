import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { OrdemServicoCardComponent } from 'src/app/components/ordem-servico/ordem-servico-card/ordem-servico-card.component';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';
import { ClassificacaoSelectComponent } from 'src/app/components/filters/classificacao-select/classificacao-select.component';
import { RouterLink } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.page.html',
  styleUrls: ['./ordem-servico.page.scss'],
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
    IonIcon,
    OrdemServicoCardComponent,
    StatusSelectComponent,
    ClassificacaoSelectComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    RouterLink,
  ],
})
export class OrdemServicoPage implements OnInit {
  ordens: OrdemServico[] = [];
  next_page: String | null = null;
  stopLoading = false;
  params: any[] = [];
  loaded = false;

  constructor(private osService: OrdemServicoService) {
    addIcons({ add });
  }

  addParam(label: any, value: any = '') {
    this.ordens = [];
    this.next_page = null;
    this.stopLoading = false;
    const verifyParam = this.params.findIndex((param) => param.label == label);
    const obj = {
      label: label,
      value: value ?? '',
    };

    verifyParam < 0 ? this.params.push(obj) : (this.params[verifyParam] = obj);

    this.loadOrdens(this.next_page, this.params);
  }

  async searchOS(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value;
    this.addParam('search', query);
  }

  onIonInfinite(event: any) {
    if (this.ordens.length > 0 && this.next_page) {
      this.loadOrdens(this.next_page);
    }
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async loadOrdens(next_page: any = null, params: any[] | null = null) {
    const response = await this.osService.getOS(next_page, params);

    // Converte todos os dados em instâncias da classe OrdemServico
    const ordensConvertidas: OrdemServico[] = response.data.map(
      (dto: OrdemServicoDTO) => new OrdemServico(dto)
    );

    if (next_page == null) {
      if (this.ordens.length == 0) {
        this.stopLoading = false;
        this.ordens = ordensConvertidas;
      } else {
        this.stopLoading = true;
      }
    } else {
      this.ordens = [...this.ordens, ...ordensConvertidas];
    }

    this.next_page = response.next_page_url;
  }

  async ionViewWillEnter() {
    await this.loadOrdens();
    this.loaded = true;
  }

  ngOnInit() {
    this.loadOrdens();
  }
}

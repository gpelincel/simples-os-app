import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonDatetimeButton, IonModal, IonDatetime, IonLabel, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { ListOsComponent } from 'src/app/components/ordem-servico/list-os/list-os.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonDatetimeButton, IonModal, IonDatetime, IonLabel, IonItem, ListOsComponent, IonSpinner, StatusSelectComponent]
})
export class AgendaPage implements OnInit {

  ordens: OrdemServico[] = [];
  data_filter = null;
  loading = true;
  params:any[] = [];

  searchAgenda(event:any){

  }

  filterByDate(event:any){
    const target = event.target as HTMLIonDatetimeElement;
    if (target.value) {
      this.addParam('data', String(target.value).split('T')[0]);
    }

  }

  addParam(label: any, value: any = '') {
    this.ordens = [];
    const verifyParam = this.params.findIndex((param) => param.label == label);
    const obj = {
      label: label,
      value: value ?? '',
    };

    verifyParam < 0 ? this.params.push(obj) : (this.params[verifyParam] = obj);

    this.loadAgendamentos(this.params);
  }

  constructor(private agendaService: AgendaService) { }

  async loadAgendamentos(params:any[] = []){
    this.ordens = (await this.agendaService.getAgendamentos(params));
    this.loading = false;
  }

  ngOnInit() {
    this.loadAgendamentos();
  }

}

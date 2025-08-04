import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSearchbar, IonDatetimeButton, IonModal, IonDatetime, IonLabel, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { ListOsComponent } from 'src/app/components/ordem-servico/list-os/list-os.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonSearchbar, IonDatetimeButton, IonModal, IonDatetime, IonLabel, IonItem, ListOsComponent, IonSpinner]
})
export class AgendaPage implements OnInit {

  ordens: OrdemServico[] = [];
  data_filter = null;
  loading = true;

  searchAgenda(event:any){

  }

  filterByDate(event:any){
    const target = event.target as HTMLIonDatetimeElement;
    if (target.value) {
      this.loadAgendamentos(String(target.value).split('T')[0]);
    }
  }

  constructor(private agendaService: AgendaService) { }

  async loadAgendamentos(data_filter:string|null = null){
    this.ordens = (await this.agendaService.getAgendamentos(data_filter));
    this.loading = false;
  }

  ngOnInit() {
    this.loadAgendamentos();
  }

}

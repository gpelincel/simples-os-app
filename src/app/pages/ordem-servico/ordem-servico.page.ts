import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonButton, IonIcon, IonMenuButton, IonButtons, IonSelect, IonSelectOption, IonItem, IonList} from '@ionic/angular/standalone';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { OrdemServicoCardComponent } from 'src/app/components/ordem-servico/ordem-servico-card/ordem-servico-card.component';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.page.html',
  styleUrls: ['./ordem-servico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons, IonSearchbar, IonButton, IonIcon, NgForOf, OrdemServicoCardComponent, IonSelect, IonSelectOption, IonItem, IonList, StatusSelectComponent]
})
export class OrdemServicoPage implements OnInit {

  ordens:any[] = [];

  constructor(private osService: OrdemServicoService) {
    addIcons({ addCircle });
  }

  async searchOS(status:any){
    this.ordens = await this.osService.getOS(status);
  }

  async ngOnInit() {
    this.ordens = await this.osService.getOS();
  }
}

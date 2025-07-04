import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonCheckbox, IonButton, IonSpinner, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-info-ordem-servico',
  templateUrl: './info-ordem-servico.page.html',
  styleUrls: ['./info-ordem-servico.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonCheckbox, IonButton, IonSpinner, RouterLink, IonIcon]
})
export class InfoOrdemServicoPage implements OnInit {

  id_os:any;
  private route = inject(ActivatedRoute);
  ordem_servico: any;
  loaded = false;

  constructor(private osService: OrdemServicoService) { 
    this.id_os = this.route.snapshot.paramMap.get('id');
    addIcons({arrowBackCircleOutline});
  }
  
  async ngOnInit() {
    this.ordem_servico = await this.osService.getOSByID(this.id_os);
    this.loaded = true;
  }

}

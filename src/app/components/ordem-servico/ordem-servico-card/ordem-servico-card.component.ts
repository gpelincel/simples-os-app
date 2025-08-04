import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { call, mail, calendarOutline } from 'ionicons/icons';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';

@Component({
  standalone: true,
  selector: 'app-ordem-servico-card',
  templateUrl: './ordem-servico-card.component.html',
  styleUrls: ['./ordem-servico-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonIcon]
})
export class OrdemServicoCardComponent  implements OnInit {

  @Input() os!:OrdemServico;

  constructor() {
    addIcons({calendarOutline,call,mail});
   }

  ngOnInit() {
  }

}

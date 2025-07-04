import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonButton } from '@ionic/angular/standalone';
import { call, mail } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-ordem-servico-card',
  templateUrl: './ordem-servico-card.component.html',
  styleUrls: ['./ordem-servico-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonButton]
})
export class OrdemServicoCardComponent  implements OnInit {

  @Input() os:any = {};

  constructor() {
    addIcons({call, mail});
   }

  ngOnInit() {}

}

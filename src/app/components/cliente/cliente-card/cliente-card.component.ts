import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { call, mail } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-cliente-card',
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonLabel]
})
export class ClienteCardComponent  implements OnInit {

  @Input() cliente:any;

  constructor() {
    addIcons({mail, call})
  }

  ngOnInit() {}

}

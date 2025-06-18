import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { barcode, call, mail, pricetag } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-equipamento-card',
  templateUrl: './equipamento-card.component.html',
  styleUrls: ['./equipamento-card.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonChip,
    IonLabel,
  ],
})
export class EquipamentoCardComponent implements OnInit {
  @Input() equipamento: any = {};

  constructor() {
    addIcons({ call, mail, barcode, pricetag });
  }

  ngOnInit() {}
}

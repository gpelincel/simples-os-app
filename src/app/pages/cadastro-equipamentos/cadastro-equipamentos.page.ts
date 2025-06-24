import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircle, arrowBackCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro-equipamentos',
  templateUrl: './cadastro-equipamentos.page.html',
  styleUrls: ['./cadastro-equipamentos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, IonButtons]
})
export class CadastroEquipamentosPage implements OnInit {

  constructor() { 
    addIcons({arrowBackCircleOutline});
  }

  ngOnInit() {
  }

}

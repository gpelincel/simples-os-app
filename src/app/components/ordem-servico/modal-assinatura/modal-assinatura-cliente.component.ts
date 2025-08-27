import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  ModalController
} from '@ionic/angular/standalone';
import { PadAssinaturaComponent } from '../../pad-assinatura/pad-assinatura.component';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, PadAssinaturaComponent],
  selector: 'app-modal-assinatura-cliente',
  templateUrl: './modal-assinatura-cliente.component.html',
  styleUrls: ['./modal-assinatura-cliente.component.scss'],
})
export class ModalAssinaturaComponent {
  @ViewChild(PadAssinaturaComponent) padAssinatura!: PadAssinaturaComponent;
  @Input() cargo!:string;

  constructor(private modalController: ModalController, private toast: ToastService) {}

  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const imagem = this.padAssinatura.save();
    return this.modalController.dismiss(imagem, 'confirm');
  }
}

import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(status:any, message:any){
    const toast = await this.toastController.create({
      message: message,
      icon: status == 'success' ? 'checkmark-circle' : 'close-circle',
      duration: 1500,
      position: 'middle',
      color: status == 'success' ? 'success' : 'danger',
    });

    await toast.present();
  }

  async loadingToast(message:any){
    
  }

}

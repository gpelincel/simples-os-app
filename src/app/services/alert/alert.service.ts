import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) { }

  async presentAlert(header: string, message:string, callback:Function){
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => {
          callback();
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
      }],
    });

    await alert.present();
  }
}

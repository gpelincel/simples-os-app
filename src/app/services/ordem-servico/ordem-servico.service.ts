import { Injectable } from '@angular/core';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { environment } from 'src/environments/environment';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileViewer } from '@capacitor/file-viewer';
import {ToastController} from '@ionic/angular/standalone';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService {
  constructor(private toastController: ToastController, private toastService: ToastService) {}

  api_url = environment.api_url + 'ordem-servico';

  getOS(next_page: string | null = null, params: any[] | null = null) {
    let url_params = '';
    if (params && params.length > 0) {
      url_params = '?';
      params.map((param) => {
        url_params += `${param.label}=${param.value}&`;
      });
    }

    const url = next_page ? next_page : this.api_url + url_params;
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  getOSByID(id: number) {
    return fetch(this.api_url + '/' + id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  storeOS(os: any) {
    return fetch(this.api_url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(os),
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  async imprimirOS(fields: any, id: any) {
    const toast = await this.toastController.create({
      message: 'Baixando PDF...',
      icon: 'download-outline',
      position: 'middle',
      color: 'tertiary',
    });

    toast.isOpen = true;

    fetch(this.api_url + '/imprimir/' + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(fields),
    })
      .then((response) => response.blob())
      .then(async (response) => {
        const arrayBuffer = await response.arrayBuffer();
        const base64 = this.arrayBufferToBase64(arrayBuffer);

        const fileName = `ordem-servico-${id}-${Date.now()}.pdf`;

        const writeResponse = await Filesystem.writeFile({
          path: fileName,
          data: base64,
          directory: Directory.Documents,
        });

        toast.isOpen = false;

        await FileViewer.openDocumentFromLocalPath({
          path: writeResponse.uri,
        });
      })
      .catch((error) => this.toastService.presentToast('error', `Erro: ${error}`));
  }

  async excluirOS(id:number){
    return fetch(this.api_url+'/'+id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }
}

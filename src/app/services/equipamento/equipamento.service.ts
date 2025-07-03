import { Injectable } from '@angular/core';
import { Equipamento } from 'src/app/models/equipamento/equipamento';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  constructor(private toast : ToastService) {}

  api_url = environment.api_url + 'equipamento';

  getEquipamentos(
    next_page: string | null = null,
    search: string | null = null
  ) {
    search = search ? '?search=' + search : '';
    const url = next_page ? next_page : this.api_url + search;
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

  getEquipamentoByCliente(
    id_cliente:any
  ) {
    
    const url = environment.api_url+'cliente/equipamento/'+id_cliente;
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => console.error('Error', error));
  }

  storeEquipamento(equipamento: Equipamento) {
    return fetch(this.api_url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      method: 'POST',
      body: JSON.stringify(equipamento),
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => console.error('Error', error));
  }
}

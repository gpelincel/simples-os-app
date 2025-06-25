import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  api_url = environment.api_url + 'cliente';

  constructor() { }

  getClientes(
    next_page: string | null = null,
    search: string | null = null
  ) {
    search = search ? '?search=' + search : '';
    const url = next_page
      ? next_page
      : this.api_url + search;
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

  storeCliente(cliente: Cliente) {
      return fetch(this.api_url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        method: 'POST',
        body: JSON.stringify(cliente),
      })
        .then((response) => response.json())
        .then((response) => {
          return response;
        })
        .catch((error) => console.error('Error', error));
    }
}

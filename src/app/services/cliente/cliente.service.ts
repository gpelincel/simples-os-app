import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(
    next_page: string | null = null,
    search: string | null = null
  ) {
    search = search ? '?search=' + search : '';
    const url = next_page
      ? next_page
      : environment.api_url + 'cliente' + search;
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
}

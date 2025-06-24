import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor() { }

  getOS(
    next_page: string | null = null,
    params: any[] | null = null
  ) {
    let url_params = '';
    if (params && params.length > 0) {
      url_params = '?';
      params.map((param) => {
        url_params += `${param.label}=${param.value}&`
      });
    }

    const url = next_page
      ? next_page
      : environment.api_url + 'ordem-servico' + url_params;
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

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  constructor() {}

  getEquipamentos(params: any = null) {
    let url_params = '';

    if (params) {
      url_params = `?search=${params}`;
    }

    return fetch(environment.api_url + 'equipamento' + url_params, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.error('Error', error));
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracoesService {
  constructor() {}

  getStatus() {
    return fetch(environment.api_url + 'configuracao/status', {
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

  getClassificacao() {
    return fetch(environment.api_url + 'configuracao/classificacao', {
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

  getUnidades() {
    return fetch(environment.api_url + 'configuracao/unidade', {
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

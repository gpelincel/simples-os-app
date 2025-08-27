import { Injectable } from '@angular/core';
import { OrdemServicoDTO } from 'src/app/domain/OrdemServicoDTO';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  api_url = environment.api_url + 'agenda';

  constructor() {}

  getAgendamentos(params:any[]) {
    let url = this.api_url;

    if (params.length > 0) {
      url += '?';
      params.map((param) => {
        url += `${param.label}=${param.value}&`;
      });
    }

    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.data.length > 0) {
          const ordens = response.data;
          return ordens.map((os:OrdemServicoDTO) => new OrdemServico(os));
        } else {
          return [];
        }
      })
      .catch((error) => console.error('Error', error));
  }
}

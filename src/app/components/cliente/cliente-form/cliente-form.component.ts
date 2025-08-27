import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate } from '@maskito/core';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CNPJ_MASK, TELEFONE_MASK, CEP_MASK } from 'src/app/utils/masks';
import {
  IonItem,
  IonInput,
  IonButton,
  IonItemDivider,
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonItemDivider,
    IonLabel,
    MaskitoDirective,
    IonSpinner
  ],
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  @Output() submit = new EventEmitter();
  cliente = new Cliente();
  endereco: any = {};
  route = inject(ActivatedRoute);
  loaded = false;
  cnpjMask = CNPJ_MASK;
  telefoneMask = TELEFONE_MASK;
  cepMask = CEP_MASK;
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor(
    private clienteService: ClienteService,
    private toastService: ToastService,
    private location: Location
  ) {
    addIcons({ arrowBackCircleOutline });
  }

  async ngOnInit() {
    const id_cliente = this.route.snapshot.paramMap.get('id');

    if (id_cliente) {
      this.cliente = await this.clienteService.getByID(id_cliente);
      this.cliente.id = Number(id_cliente);
      this.endereco = this.cliente.endereco;
    }

    this.loaded = true;
  }

  async onSubmit() {
    this.submit.emit({ ...this.cliente, ...this.endereco });
  }

  async fillAddress(cep: string) {
    const data = await this.clienteService.getCEP(cep);

    if (!data.erro) {
      this.endereco.logradouro = data.logradouro;
      this.endereco.cidade = data.localidade;
      this.endereco.estado = data.uf;
      this.endereco.bairro = data.bairro;
    } else {
      this.toastService.presentToast(
        'error',
        'Não foi possível encontrar registros desse CEP'
      );
    }
  }

  async searchCEP(event: Event) {
    const target = event.target as HTMLIonInputElement;
    const cep = String(target.value).replace(/\D/g, '');

    this.fillAddress(cep);
  }

  async searchCNPJ(event: Event) {
    const target = event.target as HTMLIonInputElement;
    const cnpj = String(target.value).replace(/\D/g, '');
    const data = await this.clienteService.getByCNPJ(cnpj);

    if (!data.code) {
      this.cliente.razao_social = data.company.name;
      this.endereco.cidade = data.address.city;
      this.endereco.estado = data.address.state;
      this.endereco.cep =
        String(data.address.zip).slice(0, 5) +
        '-' +
        String(data.address.zip).slice(5, 8);

      if (data.emails.length > 0) {
        this.cliente.email = data.emails[0].address;
      }

      this.fillAddress(data.address.zip);
    } else {
      this.toastService.presentToast(
        'error',
        'Não foi possível encontrar registros desse CNPJ'
      );
    }
  }

  cancelar(){
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Equipamento } from 'src/app/models/equipamento/equipamento';
import { Router, RouterLink } from '@angular/router';
import { EquipamentoService } from 'src/app/services/equipamento/equipamento.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ClientesSelectComponent } from 'src/app/components/filters/clientes-select/clientes-select.component';

@Component({
  selector: 'app-cadastro-equipamentos',
  templateUrl: './cadastro-equipamentos.page.html',
  styleUrls: ['./cadastro-equipamentos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonButton,
    IonButtons,
    RouterLink,
    ClientesSelectComponent,
    IonBackButton,
  ],
})
export class CadastroEquipamentosPage implements OnInit {
  equipamento: Equipamento = new Equipamento();
  errors: any = {};
  query: any;

  constructor(
    private equipamentoService: EquipamentoService,
    private toast: ToastService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  selecionarCliente(id_cliente: number | null) {
    this.equipamento.id_cliente = id_cliente;
  }

  async onSubmit() {
    const response = await this.equipamentoService.storeEquipamento(
      this.equipamento
    );

    if (response.errors) {
      const primeiroCampo = Object.keys(response.errors)[0];
      const primeiraMensagem = response.errors[primeiroCampo][0];

      this.toast.presentToast('error', primeiraMensagem); // mostra só um toast
    } else {
      this.toast.presentToast('success', response.message);
      this.router.navigate(['/equipamentos']);
    }
  }
}

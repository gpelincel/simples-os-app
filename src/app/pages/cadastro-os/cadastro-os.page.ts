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
  IonIcon,
  IonButtons,
  IonLabel,
  IonItemGroup,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router, RouterLink } from '@angular/router';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ClientesSelectComponent } from 'src/app/components/filters/clientes-select/clientes-select.component';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { StatusSelectComponent } from 'src/app/components/filters/status-select/status-select.component';
import { ClassificacaoSelectComponent } from 'src/app/components/filters/classificacao-select/classificacao-select.component';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { Item } from 'src/app/models/item/item';
import { EquipamentoSelectComponent } from 'src/app/components/equipamento/equipamento-select/equipamento-select.component';
import { UnidadeSelectComponent } from 'src/app/components/filters/unidade-select/unidade-select.component';

@Component({
  selector: 'app-cadastro-os',
  templateUrl: './cadastro-os.page.html',
  styleUrls: ['./cadastro-os.page.scss'],
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
    IonIcon,
    IonButtons,
    RouterLink,
    ClientesSelectComponent,
    StatusSelectComponent,
    ClassificacaoSelectComponent,
    IonLabel,
    IonItemGroup,
    IonSelect,
    IonSelectOption,
    EquipamentoSelectComponent,
    UnidadeSelectComponent
  ],
})
export class CadastroOsPage implements OnInit {
  ordem_servico = new OrdemServico();
  itens: Item[] = [];

  recalculateValor() {
    let total = 0;
    this.itens.map((item: Item) => {
      total += Number(item.quantidade) * Number(item.valor_unitario);
    });

    this.ordem_servico.valor_total = total;
  }

  constructor(
    private toast: ToastService,
    private router: Router,
    private osService: OrdemServicoService
  ) {
    this.ordem_servico = new OrdemServico();
    addIcons({ arrowBackCircleOutline });
    this.itens.push(new Item());
  }

  ngOnInit() {}

  addItemInput() {
    let id = this.itens.length + 1;
    this.itens = [...this.itens, new Item(id)];
  }

  selecionarCliente(id_cliente: number | null) {
    this.ordem_servico.id_cliente = id_cliente;
  }

  selecionarEquipamento(id_equipamento: number | null) {
    this.ordem_servico.id_equipamento = id_equipamento;
  }

  selecionarUnidade(id_unidade:any, item:any){
    item.id_unidade = id_unidade;
  }

  async onSubmit() {
    this.ordem_servico.itens = this.itens;

    console.log(this.itens);
    return;

    const response = await this.osService.storeOS(this.ordem_servico);
    let message = response.message;

    if (response.errors) {
      const primeiroCampo = Object.keys(response.errors)[0];
      message = response.errors[primeiroCampo][0];
    }

    this.toast.presentToast(response.status, message);

    if (response.status == 'success') {
      this.router.navigate(['/ordem-servico']);
    }
  }
}

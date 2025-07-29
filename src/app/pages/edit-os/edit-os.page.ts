import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonSpinner,
  IonBackButton
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormOsComponent } from 'src/app/components/ordem-servico/form-os/form-os.component';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { Item } from 'src/app/models/item/item';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';

@Component({
  selector: 'app-edit-os',
  templateUrl: './edit-os.page.html',
  styleUrls: ['./edit-os.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    FormOsComponent,
    IonSpinner,
    IonBackButton
  ],
})
export class EditOsPage implements OnInit {
  id_os: string | null = null;
  route = inject(ActivatedRoute);
  os_form!: FormGroup;
  loaded = false;
  ordem_servico!: OrdemServico;

  constructor(
    private osService: OrdemServicoService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id_os = this.route.snapshot.paramMap.get('id');
    addIcons({ arrowBackCircleOutline });
    this.getOS();
  }

  async getOS() {
    const response = await this.osService.getOSByID(Number(this.id_os));
    this.ordem_servico = response!;
  }

  async ngOnInit() {
    await this.getOS();
    this.os_form = this.fb.group({
      titulo: [this.ordem_servico.titulo],
      observacao: [this.ordem_servico.descricao],
      codigo_compra: [this.ordem_servico.codigo_compra],
      nota_fiscal: [this.ordem_servico.nota_fiscal],
      data_inicio: [new Date(this.ordem_servico.data_inicio).toISOString()],
      data_conclusao: [this.ordem_servico.data_conclusao?.toISOString()],
      valor_total: [this.ordem_servico.valor_total.valorFormated],
      id_classificacao: [this.ordem_servico.id_classificacao],
      id_cliente: [this.ordem_servico.id_cliente],
      id_status: [this.ordem_servico.id_status],
      id_equipamento: [this.ordem_servico.id_equipamento],
      itens: this.fb.array(
        this.ordem_servico.itens.map((item) => this.createItemGroup(item))
      ),
    });

    this.loaded = true;
  }

  createItemGroup(item: Item): FormGroup {
    return this.fb.group({
      id: [item.id],
      quantidade: [item.quantidade],
      id_unidade: [item.id_unidade],
      nome: [item.nome],
      valor_unitario: [item.valor_unitario.valorFormated],
    });
  }

  async updateOS(ordem_servico: any) {
    const response = await this.osService.editOS(
      ordem_servico,
      this.id_os
    );
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

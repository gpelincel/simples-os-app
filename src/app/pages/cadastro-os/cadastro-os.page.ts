import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { FormOsComponent } from 'src/app/components/ordem-servico/form-os/form-os.component';
import { Router } from '@angular/router';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
    IonButtons,
    FormOsComponent,
    IonBackButton
  ],
})
export class CadastroOsPage implements OnInit {
  os_form!: FormGroup;

  constructor(
    private osService: OrdemServicoService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.os_form = this.fb.group({
      titulo: [''],
      observacao: [''],
      codigo_compra: [''],
      nota_fiscal: [''],
      data_inicio: [null],
      data_conclusao: [null],
      valor_total: [''],
      id_classificacao: [0],
      id_cliente: [0],
      id_status: [0],
      id_equipamento: [0],
      itens: this.fb.array([]),
    });
  }

  async storeOS(ordem_servico: any) {
    const response = await this.osService.storeOS(ordem_servico);
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

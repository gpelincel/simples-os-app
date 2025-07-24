import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { OrdemServico } from 'src/app/models/ordem-servico/ordem-servico';
import { FormOsComponent } from 'src/app/components/ordem-servico/form-os/form-os.component';
import { Router, RouterLink } from '@angular/router';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdemServicoEntity } from 'src/app/domain/OrdemServicoEntity';

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
    IonButton,
    IonIcon,
    RouterLink,
  ],
})
export class CadastroOsPage implements OnInit {

  os_form!: FormGroup;

  constructor(private osService: OrdemServicoService, private toast: ToastService, private router: Router, private fb: FormBuilder) {
    addIcons({ arrowBackCircleOutline });
  }

  ngOnInit() {
    this.os_form = this.fb.group({
      titulo: [''],
      observacao: [''],
      codigo_compra: [''],
      nota_fiscal: [''],
      data_inicio: [''],
      data_conclusao: [''],
      valor_total: [''],
      id_classificacao: [0],
      id_cliente: [0],
      id_status: [0],
      id_equipamento: [0],
      itens: this.fb.array([])
    })
  }

  async storeOS(ordem_servico: FormGroup) {
    const response = await this.osService.storeOS(ordem_servico.value);
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

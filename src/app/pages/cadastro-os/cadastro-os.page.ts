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
  ],
})
export class CadastroOsPage implements OnInit {
  ordem_servico = new OrdemServico(
    '',
    '',
    '',
    '',
    '',
    '',
    null,
    null,
    null,
    null
  );

  constructor(
    private toast: ToastService,
    private router: Router,
    private osService: OrdemServicoService
  ) {
    this.ordem_servico = new OrdemServico(
    '',
    '',
    '',
    '',
    '',
    '',
    null,
    null,
    null,
    null
  );
    addIcons({ arrowBackCircleOutline });
  }

  ngOnInit() {}

  selecionarCliente(id_cliente: number | null) {
    this.ordem_servico.id_cliente = id_cliente;
  }

  async onSubmit() {
    const response = await this.osService.storeOS(this.ordem_servico);
    let message = response.message;

    if (response.errors) {
      const primeiroCampo = Object.keys(response.errors)[0];
      message = response.errors[primeiroCampo][0];
    }

    this.toast.presentToast(response.status, message);

    if (response.status == "success") {
      this.router.navigate(['/ordem-servico']);
    }
  }
}

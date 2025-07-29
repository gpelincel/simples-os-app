import { Component, Input, OnInit } from '@angular/core';
import { OrdemServicoCardComponent } from '../ordem-servico-card/ordem-servico-card.component';
import {
  IonContent,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
  InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { OrdemServicoService } from 'src/app/services/ordem-servico/ordem-servico.service';

@Component({
  standalone: true,
  imports: [OrdemServicoCardComponent, IonInfiniteScroll, IonInfiniteScrollContent],
  selector: 'app-list-os',
  templateUrl: './list-os.component.html',
  styleUrls: ['./list-os.component.scss'],
})
export class ListOsComponent  implements OnInit {

  @Input() ordens:any[] = [];

  constructor(private osService: OrdemServicoService) { }

  async ngOnInit() {}

  onIonInfinite(event:InfiniteScrollCustomEvent){
  }
}

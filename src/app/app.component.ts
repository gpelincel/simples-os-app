
import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { briefcase, briefcaseOutline, calendar, calendarOutline, checkmarkCircle, closeCircle, cog, construct, constructOutline, downloadOutline, logOut, logOutOutline, people, peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  username = sessionStorage.getItem('username') || "User";
  public appPages = [
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'OS', url: '/ordem-servico', icon: 'construct' },
    { title: 'Agenda', url: '/agenda', icon: 'calendar' },
    { title: 'Equipamentos', url: '/equipamentos', icon: 'briefcase' },
    { title: 'Configurações', url: '/config', icon: 'cog' },
  ];
  constructor(private router: Router) {
    addIcons({ peopleOutline, constructOutline, calendarOutline, briefcaseOutline, logOutOutline, people, construct, calendar, briefcase, logOut, checkmarkCircle, closeCircle, cog, downloadOutline });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

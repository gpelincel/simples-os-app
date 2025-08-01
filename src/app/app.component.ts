import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { App } from '@capacitor/app';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  Platform,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcase,
  briefcaseOutline,
  calendar,
  calendarOutline,
  checkmarkCircle,
  closeCircle,
  cog,
  construct,
  constructOutline,
  downloadOutline,
  logOut,
  logOutOutline,
  people,
  peopleOutline,
} from 'ionicons/icons';
import { Location } from '@angular/common';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  username = sessionStorage.getItem('username') || 'User';
  public appPages = [
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'OS', url: '/ordem-servico', icon: 'construct' },
    { title: 'Agenda', url: '/agenda', icon: 'calendar' },
    { title: 'Equipamentos', url: '/equipamentos', icon: 'briefcase' },
    { title: 'Configurações', url: '/config', icon: 'cog' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
  ];

  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000;

  constructor(
    private router: Router,
    private platform: Platform,
    private location: Location,
    private toast: ToastService
  ) {
    addIcons({
      peopleOutline,
      constructOutline,
      calendarOutline,
      briefcaseOutline,
      logOutOutline,
      people,
      construct,
      calendar,
      briefcase,
      logOut,
      checkmarkCircle,
      closeCircle,
      cog,
      downloadOutline,
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.addEventListener('ionBackButton', () => {
        const currentUrl = this.router.url;

        if (currentUrl === '/login' || currentUrl === '/') {
          const currentTime = new Date().getTime();

          if (currentTime - this.lastTimeBackPress < this.timePeriodToExit) {
            App.exitApp();
          } else {
            this.lastTimeBackPress = currentTime;
            this.toast.presentToast('success', "Pressione novamente para sair");
          }
        } else {
          this.location.back(); // Volta para a tela anterior
        }
      });
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
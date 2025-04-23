import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Proveedores', url: '/proveedores', icon: 'people' },
    { title: 'Parcelas', url: '/parcelas', icon: 'map' },
    { title: 'Aplicadores', url: '/aplicadores', icon: 'person' },
  ];

  constructor() {}
}

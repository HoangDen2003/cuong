import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faNewspaper, faDashboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  faDashboard = faDashboard;
  faNewspaper = faNewspaper;
  faUser = faUser;

  constructor(private router: Router) {}

  isDashboardActive(): boolean {
    return this.router.isActive('/#', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  };

  isPostActive(): boolean {
    const currentUrl = this.router.url.split('?')[0];
    return currentUrl === '/post';
  };

  isAccountActive(): boolean {
    return this.router.isActive('/account-page', {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  };

}

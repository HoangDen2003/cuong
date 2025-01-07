// layout-main.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {

  toggleIcon() {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('layout-menu-fixed')) {
      htmlElement.classList.remove('layout-menu-expanded');
    } else {
      htmlElement.classList.add('layout-menu-expanded');
    }
  }
}

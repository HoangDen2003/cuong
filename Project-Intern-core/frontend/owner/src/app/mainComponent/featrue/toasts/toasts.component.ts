import { Component, inject } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ToastsService } from './toasts.service';
@Component({
  standalone: true,
  selector: 'app-toasts',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css']
})

export class ToastsComponent {
  toastService = inject(ToastsService)
}

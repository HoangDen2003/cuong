import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-edit-status-dialog',
  templateUrl: './edit-status-dialog.component.html',
  styleUrls: ['./edit-status-dialog.component.css'],
})
export class EditStatusDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  showItems = false;
  selectedStatusText = '-- Choose status --';

  faFloppyDisk = faFloppyDisk;

  toastService = inject(ToastsService);

  statuses = [
    { value: 'false', name: 'Hidden' },
    { value: 'true', name: 'Active' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router ) {
    library.add(faFloppyDisk);
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  }

  createForm(): void {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['status'],
    });
  }

  toggleItems(): void {
    this.showItems = !this.showItems;
  }

  closeModal(): void {
    const modal = document.getElementById('edit-status-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      };
      this.apiService.updateStatus(formData).subscribe({
        next: (data: any) => {
          this.setNoty(data["message"], "toast--success", 4000)
          setTimeout(() => {
            this.router.navigate(['/post'])
          }, 500);
          window.location.reload();
        },
        error: (error) => {
          this.toastService.show({
            template: error["error"]["message"],
            classname: "toast--error",
            delay: 5000
          });
        }
      });
      this.closeModal();
    }
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message);
    localStorage.setItem('classname', classname);
    localStorage.setItem('delay', delay);
    localStorage.setItem('msg', "Update status successfully.");
  };
}

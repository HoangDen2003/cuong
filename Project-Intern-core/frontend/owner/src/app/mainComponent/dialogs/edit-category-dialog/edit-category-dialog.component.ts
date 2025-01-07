import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;
  responseDataCategory: any[] = [];
  showItems = false;
  selectedCategoryText = '-- Choose category --';

  faFloppyDisk = faFloppyDisk;

  toastService = inject(ToastsService);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
    library.add(faFloppyDisk);
    
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['category_id'],
    });
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  ngOnInit(): void {
    this.getDataCategory();
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.responseDataCategory = response.data;
    });
  };

  toggleItems(): void {
    this.showItems = !this.showItems;
  };

  closeModal(): void {
    const modal = document.getElementById('edit-category-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      };
      this.apiService.updateCategory(formData).subscribe({
        next: (data: any) => {
          this.setNoty(data["message"], "toast--success", 4000)
          setTimeout(() => {
            this.router.navigate(['/post'])
            window.location.reload();
          }, 500);
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
    localStorage.setItem('msg', "Update category successfully.");
  };
}

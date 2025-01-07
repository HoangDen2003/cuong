import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  @Input() Keyword: string = '';
  @Input() page: number = 1;
  @Input() perPage: number = 10;
  @Output() filterApplied = new EventEmitter<{ status: string, categories: number[] }>();

  postForm: FormGroup;
  responseDataCategory: any[] = [];
  selectedStatusText = '-- Choose status --';
  selectedCategoryText = '-- Choose category --';
  selectedCategories: number[] = [];

  faFloppyDisk = faFloppyDisk;

  statuses = [
    { value: 'false', name: 'Hidden' },
    { value: 'true', name: 'Active' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService ) {
    library.add(faFloppyDisk);
  };

  ngOnInit() {
    this.createForm();
    this.getDataCategory();
  };

  createForm() {
    this.postForm = this.fb.group({
      status: [''],
      categories: [[]],
    });
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.responseDataCategory = response.data;
    });
  };

  closeModal(): void {
    const modal = document.getElementById('filter-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  onSubmit(): void {
    const status = this.postForm.get('status')?.value || '';
    const categoryIds = this.postForm.get('categories')?.value || [];

    if (this.postForm.valid) {
      this.filterApplied.emit({ status, categories: categoryIds });
      this.closeModal();
    }
  };

  deleteFilter(): void {
    this.postForm.patchValue({ status: '', categories: [] });
    this.closeModal();
  };
}

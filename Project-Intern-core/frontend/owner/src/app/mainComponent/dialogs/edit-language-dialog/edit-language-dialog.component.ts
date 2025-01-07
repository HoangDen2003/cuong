import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-language-dialog',
  templateUrl: './edit-language-dialog.component.html',
  styleUrls: ['./edit-language-dialog.component.css']
})
export class EditLanguageDialogComponent implements OnInit, OnChanges {
  @Input() selectedPostIds: number[] = [];
  @Output() closeModalDialog = new EventEmitter<boolean>();
  postForm: FormGroup;
  responseDataLanguage: any[] = [];
  showItems = false;
  selectedLanguageText = '-- Choose language --';
  selectedLanguageValue = '';

  faFloppyDisk = faFloppyDisk;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
    library.add(faFloppyDisk);
    this.createForm();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  ngOnInit() {
    document.addEventListener('click', this.onClickOutside.bind(this));
    // this.getDataLanguage();
  };

  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe(
      response => {
        console.log('API Response - Languages:', response.data);
        if (Array.isArray(response.data)) {
          this.responseDataLanguage = response.data;
        } else {
          this.responseDataLanguage = [];
        }
      },
      error => {
        console.error('Failed to fetch languages:', error);
      }
    );
  };

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['language_id']
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  };

  selectLanguage(language: any) {
    this.selectedLanguageText = language.name;
    this.selectedLanguageValue = language.id;
    this.showItems = false;

    // Update the form control value
    this.postForm.controls['value'].setValue(this.selectedLanguageValue);
  };

  onClickOutside(event: MouseEvent) {
    const customSelect = document.getElementById('language-select');
    if (customSelect && !customSelect.contains(event.target as Node)) {
      this.showItems = false;
    }
  };
  

  onSubmit() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      };
      this.apiService.updateLanguage(formData).subscribe({
        next: (response) => {
          console.log('Post update language successfully', response);
          this.router.navigate(['/post']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Failed to update language post', error);
          alert('Failed to update language post');
        },
      });
      this.closeModal();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  };

  closeModal() {
    const modal = document.getElementById('edit-language-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  };
}

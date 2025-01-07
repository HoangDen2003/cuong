import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from '../../featrue/toasts/toasts.service';

@Component({
  selector: 'app-delete-mutipal-post',
  templateUrl: './delete-mutipal-post.component.html',
  styleUrls: ['./delete-mutipal-post.component.css']
})
export class DeleteMutipalPostComponent implements OnInit {
  @Input() selectedPostIds: number[] = [];
  postForm: FormGroup;

  faFloppyDisk = faFloppyDisk;

  toastService = inject(ToastsService);
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
      library.add(faFloppyDisk);

      this.postForm = this.fb.group({
        Ids: [this.selectedPostIds],
      });
    }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  closeModal(): void {
    const modal = document.getElementById('delete-mutipal-post');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onDelete(): void {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      }
      this.apiService.deletePost(formData).subscribe({
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
    }
    this.closeModal();
  };

  setNoty(message: string, classname: string, delay: any): void {
    localStorage.setItem('template', message);
    localStorage.setItem('classname', classname);
    localStorage.setItem('delay', delay);
    localStorage.setItem('msg', "Delete successfully.");
  };
}

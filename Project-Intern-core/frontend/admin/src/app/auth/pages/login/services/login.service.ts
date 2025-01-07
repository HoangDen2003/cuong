import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
  
  item: any = {}

  setItem(item: any): void {
    this.item = item
  }

  getItem(): any {
    return this.item
  }

}

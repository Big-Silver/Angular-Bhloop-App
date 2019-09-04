import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() { }

  getJson(key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  setJson(key, content) {
    this.clear(key);
    window.sessionStorage.setItem(key, JSON.stringify(content));
  }

  clear(key) {
    window.sessionStorage.removeItem(key);
  }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuickviewService {

  constructor(private http: Http) { }

  // Get from the API
  getNotes() {
    return this.http.get('assets/data/notes.json')
      .map(res => res.json());
  }

  getUsers() {
    return this.http.get('assets/data/users.json')
      .map(res => res.json());
  }

  getChatMessages() {
    return this.http.get('assets/data/messages.json')
      .map(res => res.json());
  }
}

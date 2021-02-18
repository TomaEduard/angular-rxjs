import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService } from './messages.service.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showMessage = false;

  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log('Created messages component', );
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$
      .pipe(
        tap(() => {this.showMessage = true
        console.log('asdpls', this.errors$);})
      );
  }

  onClose() {
    this.showMessage = false;
  }

}

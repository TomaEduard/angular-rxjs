import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading/loading.service.service';
import { MessagesService } from './messages/messages.service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {


  }

  logout() {

  }

}

import { filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

  private subject = new BehaviorSubject<string[]>([]);
  public errors$: Observable<string[]> = this.subject.asObservable()
    .pipe(
      filter(messages => !!messages && messages.length > 0)
    );

  constructor() { }

  showErrors(...errors: string[]) {
    this.subject.next(errors);
  }

}

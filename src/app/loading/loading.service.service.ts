import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { concatMap, tap, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(()=> this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff())
      )
  }

  constructor() { 
    console.log('Loading service has created...', );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

}

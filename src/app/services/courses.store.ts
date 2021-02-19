import { MessagesService } from './../messages/messages.service.service';
import { Message } from './../model/message';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { LoadingService } from '../loading/loading.service.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStore {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor(private http: HttpClient,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {
    this.loadAllCourses();
  }

  loadAllCourses() {
    const loadCourses$ = this.http.get<Course[]>('/api/courses')
      .pipe(
        map(response => response['payload']),
        catchError(err => {
          const message = "Could not save courser";
          console.log(message, err);
          this.messagesService.showErrors(message);
          return throwError(err);
        }),
        tap(courses => this.subject.next(courses))
      );
      this.loadingService.showLoaderUntilCompleted(loadCourses$)
        .subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    
    const courses = this.subject.getValue();
    
    const index = courses.findIndex((course: Course) => course.id === courseId);
   
    const newCourse: Course = {
      ...courses[index],
      ...changes
    };

    // create a coppy
    // const newCourses: Course[] = courses.slice(0);
    const newCourses: Course[] = [...courses];

    newCourses[index] = newCourse;

    this.subject.next(newCourses);

    return this.http.put<Course>(`/api/courses/${courseId}`, changes)
      .pipe(
        catchError(err => {
          const message = "Could not save courser";
          console.log(message, err);
          this.messagesService.showErrors(message);
          return throwError(err);
        }),
        shareReplay()
      );

  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$
      .pipe(
        map((courses: Course[]) =>
          courses.filter(course => course.category == category)
            .sort(sortCoursesBySeqNo)
        )

      )
  }
  
}
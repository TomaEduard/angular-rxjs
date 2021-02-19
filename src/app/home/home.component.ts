import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "../loading/loading.service.service";
import { Course } from "../model/course";
import { CoursesStore } from "../services/courses.store";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesStore: CoursesStore,
    private loadingService: LoadingService
  ) {
  } 

  ngOnInit() {
    this.reloadCourses();
  }

  reloadCourses() {
    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER')
    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED')
  }

  
  turnOnOffLoading() {
    this.loadingService.loadingOn();

    setTimeout(()=> {
      this.loadingService.loadingOff();
    }, 2500)
  }

}





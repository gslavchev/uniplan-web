import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseElm } from '../../core/interfaces/course-elm';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/courses';
  private apiUrlWithMaj = 'http://localhost:8080/courses/withMaj';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseElm[]> {
    return this.http.get<CourseElm[]>(this.apiUrl).pipe(
      map((courses) =>
        courses.map((course, index) => ({
          id: course.id,
          courseYear: course.courseYear,
        }))
      )
    );
  }

  getCoursesByMajor(majorId: string): Observable<CourseElm[]> {
    return this.http.get<CourseElm[]>(`${this.apiUrlWithMaj}/${majorId}`).pipe(
      map((courses) =>
        courses.map(
          (course, index) => ({
            id: course.id,
            courseYear: course.courseYear,
          }),
          console.log(courses)
        )
      )
    );
  }
}

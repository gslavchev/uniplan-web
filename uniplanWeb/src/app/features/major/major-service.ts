import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { MajorElm } from '../../core/interfaces/major-elm';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  private apiUrl = 'http://localhost:8080/majors/all';
  private apiUrlMajor = 'http://localhost:8080/majors';
  private apiUrlCourse = 'http://localhost:8080/courses';
  private apiUrlWithFaculty = 'http://localhost:8080/majors/withFac';

  refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getMajors(): Observable<MajorElm[]> {
    return this.http.get<MajorElm[]>(this.apiUrl).pipe(
      map((majors) =>
        majors.map((major, index) => ({
          id: major.id,
          majorName: major.majorName,
          courseId: major.courseId,
          facultyId: major.facultyId,
          courseType: major.courseType,
          courseSubtype: major.courseSubtype,
          position: index + 1,
        }))
      )
    );
  }

  getMajorWithFaculty(facultyId: string): Observable<MajorElm[]> {
    return this.http
      .get<MajorElm[]>(`${this.apiUrlWithFaculty}/${facultyId}`)
      .pipe(
        map((majors) =>
          majors.map(
            (major, index) => ({
              id: major.id,
              majorName: major.majorName,
              courseId: major.courseId,
              facultyId: major.facultyId,
              courseType: major.courseType,
              courseSubtype: major.courseSubtype,
              position: index + 1,
            }),
            console.log(majors)
          )
        )
      );
  }

  createMajor(createMajor: {
    facultyId: string;
    majorName: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlMajor}`, createMajor).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }
  createCourse(course: {
    majorId: string;
    courseYear: number;
    courseType: string;
    courseSubtype: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlCourse}`, course).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }
  createMajorWithCourse(majorData: {
    facultyId: string;
    majorName: string;
    type: string;
    subtype: string;
  }): Observable<any> {
    return this.createMajor({
      facultyId: majorData.facultyId,
      majorName: majorData.majorName,
    }).pipe(
      switchMap((createdMajor: any) => {
        return this.createCourse({
          majorId: createdMajor.id,
          courseType: majorData.type,
          courseSubtype: majorData.subtype,
          courseYear: 1,
        });
      })
    );
  }

  deleteMajor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrlMajor}/${id}`).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrlCourse}/${courseId}`);
  }

  deleteMajorWithCourse(major: MajorElm): Observable<any> {
    return this.deleteCourse(major.courseId).pipe(
      switchMap(() => this.deleteMajor(major.id))
    );
  }

  editMajor(
    id: string,
    updateMajor: { facultyId: string; majorName: string }
  ): Observable<any> {
    return this.http.put(`${this.apiUrlMajor}/${id}`, updateMajor).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }
}

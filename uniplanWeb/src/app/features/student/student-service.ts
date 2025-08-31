import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { StudentElm } from '../../core/interfaces/student-elm';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/students/all';
  private apiUrlStudent = 'http://localhost:8080/students';

  refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getStudent(): Observable<StudentElm[]> {
    return this.http.get<StudentElm[]>(this.apiUrl).pipe(
      map((students) =>
        students.map(
          (student, index) => ({
            studentId: student.studentId,
            firstName: student.firstName,
            lastName: student.lastName,
            facultyNumber: student.facultyNumber,
            courseId: student.courseId,
            courseType: student.courseType,
            courseSubType: student.courseSubType,
            courseYear: student.courseYear,
            majorId: student.majorId,
            majorName: student.majorName,
            position: index + 1,
          }),
          console.log('Getting student... ', students)
        )
      )
    );
  }

  createStudent(createStudent: {
    firstName: string;
    lastName: string;
    facultyNumber: string;
    courseId: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrlStudent}`, createStudent).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrlStudent}/${studentId}`).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }

  editStudent(
    studentId: string,
    updateStudent: {
      firstName: string;
      lastName: string;
      facultyNumber: string;
      courseId: string;
    }
  ): Observable<any> {
    return this.http
      .put(`${this.apiUrlStudent}/${studentId}`, updateStudent)
      .pipe(
        map((res) => {
          this.refreshNeeded.next();
          return res;
        })
      );
  }
}

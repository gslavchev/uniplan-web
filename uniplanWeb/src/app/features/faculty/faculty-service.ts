import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { FacultyElm } from '../../core/interfaces/faculty-elm';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  private apiUrl = 'http://localhost:8080/faculties';

  refreshNeeded = new Subject<void>();

  constructor(private http: HttpClient) {}

  getFaculties(): Observable<FacultyElm[]> {
    return this.http.get<FacultyElm[]>(this.apiUrl).pipe(
      map((faculties) =>
        faculties.map((faculty, index) => ({
          id: faculty.id,
          facultyName: faculty.facultyName,
          location: faculty.location,
          universityId: faculty.universityId,
          position: index + 1,
        }))
      )
    );
  }

  createFaculty(faculty: {
    universityId: string;
    facultyName: string;
    location: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, faculty).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }

  editFaculty(
    id: string,
    updatedFaculty: {
      universityId: string;
      facultyName: string;
      location: string;
    }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedFaculty).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }

  deleteFaculty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((res) => {
        this.refreshNeeded.next();
        return res;
      })
    );
  }
}

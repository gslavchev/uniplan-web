import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MajorElm } from '../../core/interfaces/major-elm';

@Injectable({
  providedIn: 'root',
})
export class MajorService {
  private apiUrl = 'http://localhost:8080/majors/all';

  constructor(private http: HttpClient) {}

  getMajors(): Observable<MajorElm[]> {
    return this.http.get<MajorElm[]>(this.apiUrl).pipe(
      map((majors) =>
        majors.map((major, index) => ({
          majorId: major.majorId,
          majorName: major.majorName,
          facultyId: major.facultyId,
          courseType: major.courseType,
          courseSubtype: major.courseSubtype,
          position: index + 1,
        }))
      )
    );
  }

  deleteMajor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  editMajor(
    id: string,
    updateMajor: { name: string; faculty: string }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateMajor).pipe(
      map((res) => {
        return res;
      })
    );
  }
}

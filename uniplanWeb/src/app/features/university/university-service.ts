import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UniversityElm {
  id: string;
  uniName: string;
  location: string;
  establishedYear: number;
  accreditation: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  private apiUrl = 'http://localhost:8080/universities';

  constructor(private http: HttpClient) {}

  getAllUniversities(): Observable<UniversityElm[]> {
    return this.http.get<UniversityElm[]>(this.apiUrl);
  }
}

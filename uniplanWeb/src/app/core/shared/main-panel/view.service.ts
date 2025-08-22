import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewService {
  private viewSubject = new BehaviorSubject<string>('home');
  currentView$ = this.viewSubject.asObservable();

  public setView(view: string) {
    this.viewSubject.next(view);
  }
}

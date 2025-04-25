import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private selectValueSubject = new BehaviorSubject<string>(''); // Domyślna wartość
  selectValue$ = this.selectValueSubject.asObservable();

  updateSelectValue(value: string) {
    this.selectValueSubject.next(value);
  }
}

import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../auth/store/auth.actions';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectAuthUser } from '../../../auth/store/auth.selectors';
import { User } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User | null> = this.store.select(selectAuthUser);

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}

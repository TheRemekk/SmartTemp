import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import * as AuthActions from '../app/modules/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projekt-sw-fe';

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
  }
}

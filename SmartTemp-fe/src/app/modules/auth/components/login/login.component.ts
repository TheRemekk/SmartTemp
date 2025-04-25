import { Component } from '@angular/core';
import * as AuthActions from '../../store/auth.actions';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginForm} from "../../../core/models/forms.model";
import {Observable} from "rxjs";
import {selectAuthError, selectAuthLoading} from "../../store/auth.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {FormService} from "../../../core/services/form.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();

  errorMsg$: Observable<string | null> = this.store.select(selectAuthError);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);

  get controls() {
    return this.loginForm.controls;
  }
  constructor(
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onLogin() {
    this.store.dispatch(
      AuthActions.login({ loginData: this.loginForm.getRawValue() })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}

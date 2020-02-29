import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, showHeaderFooter } from './router-store/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHeaderFooter$;

  constructor(private state: Store<State>,
              private router: Router) {
    this.showHeaderFooter$ = this.state.pipe(select(showHeaderFooter));
  }

  navigateToLoginPage() {
    this.router.navigate(['/auth/login']);
  }


}

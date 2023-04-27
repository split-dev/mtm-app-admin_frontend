import { Component, Output } from '@angular/core';
import { iconSubset } from './icons/icon-subset';
import { IconSetService } from '@coreui/icons-angular';

import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mtm-app-admin-core-ui';
  @Output() navState: boolean | undefined = true;

  onChangeNavState(state: boolean | undefined) {
    this.navState = state;
  }
  constructor(
    private iconSetService: IconSetService
  ) {
    iconSetService.icons = { ...iconSubset };
  }
}

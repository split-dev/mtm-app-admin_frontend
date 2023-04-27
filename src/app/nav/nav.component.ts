import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarModule } from '@coreui/angular';
import { navItems } from './_nav';

@Component({
  selector: 'app-nav',
  imports: [SidebarModule],
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() state: boolean = true;
  @Output() changeState = new EventEmitter<boolean | undefined>();

  onChangeState() {
    this.state = !this.state;
    this.changeState.emit(this.state);
  }
  public navItems = navItems;
}

import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarModule } from '@coreui/angular';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { navItems } from './_nav';
const MOBILE_BREAKPOINT = '768';

@Component({
  selector: 'app-nav',
  imports: [SidebarModule],
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Output() state: boolean | undefined;
  @Output() desktopState: boolean = true;
  @Output() isDesktop: boolean = true;
  @Output() changeState = new EventEmitter<boolean | undefined>();

  constructor (private breakpintObserver: BreakpointObserver) {
    this.breakpintObserver.observe([
      `(max-width: ${MOBILE_BREAKPOINT}px)`
    ]).subscribe((result: BreakpointState) => {
      this.isDesktop = result.matches;

      if (result.matches) {
        this.state = false;
      } else {
        this.state = this.desktopState;
      }
      this.changeState.emit(this.state);
    })
  }

  ngOnInit() {
    this.changeState.emit(this.isDesktop ? this.desktopState : this.state);
  }

  onChangeState() {
    this.desktopState = !this.desktopState;
    this.changeState.emit(this.desktopState);
  }
  public navItems = navItems;
}

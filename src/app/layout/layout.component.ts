import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridModule } from '@coreui/angular';

@Component({
  selector: 'app-layout',
  imports: [GridModule, RouterOutlet],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}

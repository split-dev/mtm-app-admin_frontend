import { Component } from '@angular/core';
import { TableModule, UtilitiesModule } from '@coreui/angular';

@Component({
  selector: 'app-users',
  imports: [
    TableModule,
    UtilitiesModule
  ],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

}

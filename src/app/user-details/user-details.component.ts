import { Component, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() selectedUser: User | null = null; // This was already defined

  @Input() user: User | null = null; // Add this input property to fix the error

  constructor() {}
}

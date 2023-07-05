import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

interface UserAutocompleteResponse {
  success: boolean;
  data: User[]; // Assuming that the API response has a "data" field containing an array of User objects
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchTerm: string = '';
  showAutocomplete: boolean = false;
  allUsers: User[] = [];
  autocompleteUsers: User[] = [];
  selectedUser: User | null = null;
  userDetails: any | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllUsers();
  }

  fetchAllUsers() {
    this.http
      .get<UserAutocompleteResponse>('https://imai.co/api/dict/users/?q=q&limit=1000&type=search&platform=instagram', {
        headers: {
          'accept': 'application/json',
          'authkey': 'hWuFhhPVij'
        }
      })
      .subscribe((response) => {
        this.allUsers = response.data;
      });
  }

  onSearchInput() {
    if (this.searchTerm.trim() === '') {
      this.showAutocomplete = false;
      this.autocompleteUsers = [];
      return;
    }

    this.autocompleteUsers = this.allUsers.filter(user =>
      user.username.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    this.showAutocomplete = true;
  }

  onAutocompleteSelect(user: User) {
    this.searchTerm = user.username;
    this.showAutocomplete = false;
    this.selectedUser = null; // Reset selectedUser when a new user is selected.

    // Fetch user details using the provided API endpoint
    this.http
      .get<any>(`https://imai.co/api/raw/ig/user/feed/?url=${user.username}`, {
        headers: {
          'accept': 'application/json',
          'authkey': 'hWuFhhPVij'
        }
      })
      .subscribe((data) => {
        console.log('selectedUser');
        console.log(data);
        this.userDetails = data;
        this.selectedUser = {
          ...user, // Copy the properties from the selected user
          profile_pic_url: data.items[0].user.profile_pic_url,
          followers_count: data.followers_count,
          fullname: data.items[0].user.full_name,
          recent_posts: data.recent_posts
        };
      });
  }
}

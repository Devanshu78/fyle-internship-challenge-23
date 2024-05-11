import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 75, 100];

  name = '';
  public users: any[] = [];
  public repos: any = [];
  constructor(private username: ApiService) {}

  errMessage = '';
  searchByName(searchkeyword: string) {
    this.name = searchkeyword;
    this.username.getUser(this.name).subscribe(
      (data) => {
        this.users = [data];
      },
      (error) => {
        this.errMessage = error;
        console.log(error);
      }
    );
    this.username.getRepos(this.name).subscribe((repo) => {
      this.repos = repo;
      console.log(this.repos);
    });
  }

  clearInputField(input: NgForm) {
    input.resetForm();
  }

  getDetails(searchkeyword: string, input: NgForm) {
    this.searchByName(searchkeyword);
    this.clearInputField(input);
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}

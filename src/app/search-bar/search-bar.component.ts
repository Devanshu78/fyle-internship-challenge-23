import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  name = '';
  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 75, 100];
  isLoading: boolean = false;
  users: any[] = [];
  repos: any = [];
  reposLanguages: any = [];
  allLanguages: any[] = [];

  constructor(private username: ApiService) {}

  errMessage = '';
  searchByName(searchkeyword: string) {
    this.isLoading = true;
    this.name = searchkeyword.trim();
    if (this.name != '') {
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
        this.allLanguages = [];
        this.fetchLanguagesForRepos();
      });
    } else {
      console.log('enter a name before search');
    }
  }

  fetchLanguagesForRepos() {
    const requests = this.repos.map((repo: any) => {
      return this.username.fetchLanguages(repo.languages_url);
    });

    forkJoin(requests).subscribe(
      (responses: any) => {
        responses.forEach((data: any) => {
          const languages = Object.keys(data);
          this.reposLanguages = languages;
          this.allLanguages.push(this.reposLanguages);
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching languages:', error);
        this.isLoading = false;
      }
    );
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

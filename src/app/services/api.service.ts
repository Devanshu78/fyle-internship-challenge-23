import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  private authToken = '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';

  getUser(githubUsername: string) {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `token ${this.authToken}`
        ),
      })
      .pipe(catchError(this.handleError));
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getRepos(githubUsername: string) {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `token ${this.authToken}`
        ),
      })
      .pipe(catchError(this.handleError));
  }
  fetchLanguages(repoLanguagesUrl: string) {
    return this.httpClient
      .get(repoLanguagesUrl, {
        headers: new HttpHeaders().set(
          'Authorization',
          `token ${this.authToken}`
        ),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status == 403) {
        message =
          'You exceed the limit for search | Wait for an hour then try again';
        console.log(
          'GitHub allow only 60 request in an Hour for unauthorized Users'
        );
      } else {
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
        message = `Please check your UserName. Something bad happened; Backend returned code ${error.status}...`;
      }
    }
    return throwError(() => new Error(message));
  }
}

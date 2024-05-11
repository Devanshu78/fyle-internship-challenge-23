import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      message = `Please check your UserName. Something bad happened; Backend returned code ${error.status}...`;
    }
    return throwError(() => new Error(message));
  }

  getUser(githubUsername: string) {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(catchError(this.handleError));
  }

  getRepos(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}/repos`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}

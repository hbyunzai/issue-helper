import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GithubService {
  githubApi = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: no-any
  fetchReleases(owner = 'hbyunzai', repo = 'ng-yunzai'): Observable<any> {
    return this.http.get(`${this.githubApi}/repos/${owner}/${repo}/releases`);
  }

  // tslint:disable-next-line: no-any
  fetchIssues(keyword: string): Observable<any> {
    return this.http.get(`${this.githubApi}/search/issues?q=is:issue repo:hbyunzai/ng-yunzai ${keyword}&per_page=5`);
  }
}

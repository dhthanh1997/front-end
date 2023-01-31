import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commentContent } from './comment';

const urlComment = 'http://10.2.6.142:8092/taskManagement/api/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public getComment(
    pageNumber: number,
    pageSize: number,
    txtSearch?: string
  ): Observable<any> {
    return this.http.get(
      `${urlComment}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  public addComment(comment: commentContent): Observable<any> {
    return this.http.post(urlComment, comment);
  }

  public getCommentById(id: number): Observable<any> {
    return this.http.get(`${urlComment}/${id}`);
  }
}

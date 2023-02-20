import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commentContent } from '../../model/comment';
import { CommentData } from './comment-data';
import { CommentApi } from './comment.api';

@Injectable()
export class CommentService implements CommentData {

  constructor(private api: CommentApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: commentContent): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: commentContent): Observable<any> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comment } from '../comment';
import { PostService } from './post-service';

@Injectable()
export class CommentService {
    showComment = false;
    private rootUrl = environment.url;
    postId: number;

    constructor( public http: HttpClient, public postService: PostService ){
    }


    toggleComments (postId: number) {
          if (this.showComment === false) {
            this.postId = postId ;
            this.showComment = true;
          } else {
            this.showComment = false;
          }
      }

      async saveComment(comment: Comment, postId){
        return this.http.post<Comment>(this.rootUrl + "comment/" + postId, comment).toPromise();
        
      }
    

}
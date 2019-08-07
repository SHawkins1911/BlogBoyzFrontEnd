import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../post';
import { User } from '../user';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';


@Injectable()
export class PostService {
  private usersUrl: string;
  test : string;

  constructor(private http: HttpClient) { 
  }

  private rootUrl = environment.url;

  public findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.rootUrl+"posts");
    
  }

  public findByTag(tag : string): Observable<Post[]> {
    return this.http.get<Post[]>(this.rootUrl+"postsByTag/"+tag);
  }

  async save(post: Post) {
     const t = this.http.post<Post>(this.rootUrl+"posts", post).toPromise();
     return t;
  }

  async delete(id){
      const t = this.http.delete<Post[]>(this.rootUrl +"posts/"+ id).toPromise();
      return t
  }

  public saveUser(user: User) {
    return this.http.post<User>(this.rootUrl + "users", user)
  }

  public getUser(name:string) {
    return this.http.get<User>(this.rootUrl  + "usersbyname/" + name);
    
  }

  public getUserbyID(id:number) {
    return this.http.get<User>(this.rootUrl + "user/" + id) 
  }

  async updatePost(id: number, post: Post) {
    const t = this.http.put<Post>(this.rootUrl + "posts/" + id, post).toPromise();
    return t;
  }
}

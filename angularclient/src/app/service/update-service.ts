import { Injectable } from '@angular/core';
import { Post } from '../post';
import { PostService } from './post-service';
import { toUnicode } from 'punycode';

@Injectable()
export class UpdateService {
    posts: Post[];
    content: string = "fsaf";
    title: string = "afsfa";
    updatePost : Post = new Post();
    selectedPostId: number = 0;
    edit = false;


    constructor(public postService : PostService) { 
    }

    toggleEdit(id: number, content: string, title: string) {
      if(this.edit === false) {
        this.content = content;
        this.title = title;
        console.log(content, title)
        this.selectedPostId = id;
        this.edit =true;
      } else {
        this.selectedPostId = 0;
        this.edit= false;
      }
    }

    async deletePost(id) {
        await this.postService.delete(id).then(data => {
           console.log("success")
           this.getAllPost()
         })
       };

    getPostByTag(tag : string){
        this.postService.findByTag(tag).subscribe(data => {
          this.posts = data;
        })
      }
    
       getAllPost(){
          this.postService.findAll().subscribe(data => {   
          this.posts = data;
        });
      }

      async submitChanges(post_id: number) {       
        this.updatePost.content = this.content;
        this.updatePost.title = this.title;
        await this.postService.updatePost(post_id, this.updatePost)
        this.toggleEdit(0, "", "")
        this.getAllPost()
      }

}
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/post-service';
import { Post } from '../post';
import { User } from '../user';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input() showNewPost: boolean;
  @Input() loggedInUserName: string = "";
  @Input() loggedInUser_Id: number;
  @Input() loggedInUser: User;
  @Output() updateList = new EventEmitter();
  post: Post;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) {
    this.post = new Post();
  }

  async onSubmit() {
    this.post.date = new Date().toLocaleString()
    this.post.author = this.loggedInUser.name
    this.post.user_id = this.loggedInUser.user_id
    this.showNewPost = false;
    await this.postService.save(this.post).then( () => console.log("success"));
    this.sendEmit()
  }

  closePostModal() {
    this.showNewPost = false
  }

  sendEmit() {
    this.updateList.emit(null);
  }

}

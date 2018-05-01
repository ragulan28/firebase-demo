import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database-deprecated";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  courses$: FirebaseListObservable<any[]>;
  path = '/courses';

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list(this.path);

  }

  add(course: HTMLInputElement) {
    this.courses$.push({
      name: course.value,
      price: 200,
      is: true,
      sections: [
        {title: 'com'},
        {titlea: 'coma'},
        {titles: 'coms'},
      ]
    });
    course.value = '';
  }

  update(course) {
    this.db.object(this.path + '/' + course.$key)
      .set({
        title: course.$value + ' Updated',
        price: 150
      });
  }

  delete(course) {
    this.db.object(this.path + '/' + course.$key)
      .remove()
      .then(x=>{
        alert('Deleted');
      });
  }


}

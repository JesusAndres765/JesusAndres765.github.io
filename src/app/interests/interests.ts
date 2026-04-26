import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  standalone: false,
  templateUrl: './interests.html',
  styleUrl: './interests.scss',
})
export class InterestsComponent {

  interests: Interests[] = [];

  constructor(public interestsService: InterestsService) {

    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.interests = data;
      console.log(this.interests);
    });

  }
}
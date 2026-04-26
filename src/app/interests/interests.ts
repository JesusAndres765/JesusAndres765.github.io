import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(
    public interestsService: InterestsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.interestsService.getInterests().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.interests = data;
        this.cdr.detectChanges();
      });
    }
  }
}
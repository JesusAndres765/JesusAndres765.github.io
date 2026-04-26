import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {WorkExperienceService} from '../services/work-experience-service/work-experience';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import {map}from 'rxjs/operators';

@Component({
  selector: 'app-work-experience',
  standalone: false,
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.scss',
})
export class WorkExperienceComponent {

  workExperience: WorkExperience[] = [];

  constructor(public workExperienceService: WorkExperienceService,
    @Inject(PLATFORM_ID) private platformId: Object){ 
      if (isPlatformBrowser(this.platformId)) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data=>{
      this.workExperience=data;
      console.log(this.workExperience);
    });
  }
   }

}

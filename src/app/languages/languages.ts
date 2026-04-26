import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class LanguagesComponent {

  languages: Languages[] = [];

  constructor(public languagesService: LanguagesService) {

    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    });

  }
}
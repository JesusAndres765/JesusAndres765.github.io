import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from '../services/header-service/header';
import { Header } from '..//models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  header: Header = new Header();

  constructor(
    public headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object,

    private cdr: ChangeDetectorRef
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.headerService);
      this.headerService.getHeader().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.header = data[0];
        console.log(this.header);
        this.cdr.detectChanges();
      });
    }
  }
}
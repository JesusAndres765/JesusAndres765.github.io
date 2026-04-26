import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.html',
  styleUrl: './certificates.scss',
})
export class CertificatesComponent {

  certificates: Certificates[] = [];

  constructor(public certificatesService: CertificatesService) {

    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
    });

  }
}
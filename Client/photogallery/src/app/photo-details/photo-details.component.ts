import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../interfaces/photo.interface';
import { PhotoserviceService } from '../services/photoservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  photo:Photo;

  constructor(private route: ActivatedRoute,
              private ps:PhotoserviceService,
              private router: Router
  ) { }

  ngOnInit(): void {

    //console.log(this.route.snapshot.paramMap.get("id"));
    let id:any = this.route.snapshot.paramMap.get("id");
    //this.router.navigate(['/']);

    this.ps.getPhotoById(id).subscribe( photo => {
      this.photo = photo;
    });


  }

}

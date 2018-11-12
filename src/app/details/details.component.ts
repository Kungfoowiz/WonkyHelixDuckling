import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user$ : Object;

  
  constructor(private dataService : DataService, private activatedRoute : ActivatedRoute) {
    this.activatedRoute.params
      .subscribe(params => this.user$ = params.id);
  
  }

  ngOnInit() {
    this.dataService.getUser(this.user$)
      .subscribe(data => this.user$ = data);
  }

}

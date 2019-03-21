import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  value: string;
  constructor(private activatedRoute: ActivatedRoute, private router:Router) { 
   
  }

  ngOnInit() {
    
        
  }
  onHeaderTabClicked(value: string) {
    this.value = value;
  }
}

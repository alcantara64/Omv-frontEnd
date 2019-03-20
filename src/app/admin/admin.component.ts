import {Component, DoCheck, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, DoCheck {

  public  value: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {    
    this.activatedRoute.paramMap.subscribe(
      params => {
        const pageView = params.get('pageView');
        if (
          pageView === 'groups' || pageView === 'users' ||
          pageView === 'permissions' || pageView === 'work-sets' ||
          pageView === 'Work' || pageView === 'Filter' ||
          pageView === 'KPI' || pageView === 'metadata' ||
          pageView === 'bulk-uploader' || pageView === 'folder' ||
          pageView === 'uploads' || pageView === 'Media' ||
          pageView === 'Admin' || pageView === null
        )
        {
          this.value = pageView
        } else {
          this.router.navigateByUrl('page-not-found')
        }
      }
    )
  }

  ngDoCheck() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        const pageView = params.get('pageView');
        this.value = pageView;
      }
    )
  }

  // TODO: Handle this in the html
  ngAfterViewInit(){
    var col = document.getElementsByClassName("collapsible");
    for (let i = 0; i < col.length; i++) {
      col[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "%";
        }
      });
    }
  } 

  onSideBarValueChanged(data: string) {
    console.log('onSideBarValueChanged - data: ', data);
    this.value = data;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  value = 'Admin';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.value = 'Admin';
  }

  ngOnInit() {    
    this.value = this.router.url;
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

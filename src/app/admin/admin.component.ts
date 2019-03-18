import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  value = 'Admin';

  constructor() {
    this.value = 'Admin';
  }

  ngOnInit() {

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

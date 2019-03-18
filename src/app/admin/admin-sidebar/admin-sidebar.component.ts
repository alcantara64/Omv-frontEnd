import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  value: string;

  @Output()
  complete = new EventEmitter();
  
  constructor() {
    this.value = 'Admin';
   }

  ngOnInit() {
  }

  // TODO: Handle this in the html
  // ngAfterViewInit(){
    
  //   setTimeout((() => {
  //     var col = document.getElementsByClassName("collapsible");
  //     for (let i = 0; i < col.length; i++) {
  //       col[i].addEventListener("click", function () {
  //         this.classList.toggle("active");
  //         var content = this.nextElementSibling;
  //         if (content.style.maxHeight) {
  //           content.style.maxHeight = null;
  //         } else {
  //           content.style.maxHeight = content.scrollHeight + "%";
  //         }
  //       });
  //     }
  //   }), 500)
  // }  

  onListItemClicked(listItem: string) {
    
    console.log('onListItemClicked - listItem: ', listItem);
    this.value = listItem;
    this.complete.emit(this.value);
  }
}

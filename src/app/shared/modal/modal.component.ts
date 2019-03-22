import { Component, OnInit, ViewChild,Input, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalDialog')
  public dialog: DialogComponent;
  @Output() modalDialog = new EventEmitter();
  // @ViewChild('overlay')
  public overlay: CheckBoxComponent;
  // public target: string = "#modalTarget";
  public width: string = '335px';
  // @Input() public  header: string = 'Software Update';
  @Input() public data : any;
  @Input() public isModal:boolean = false;
  @ViewChild('promptDialog')
  public promptDialog: DialogComponent;
  public promptDlgBtnClick: EmitType<object> = () => {
      this.promptDialog.hide();
  }


  // public animationSettings: Object = { effect: 'None' };
  // public hide: any;
  
  ngOnInit() {
  }
  ngAfterViewInit(): void {
      document.getElementById('modalbtn').focus();
  }
  // On Button click, modal Dialog will be shown
  public modalBtnClick: EmitType<object> = () => {
  console.log(this.dialog.show());
    this.modalDialog.emit(true);
  }
  // On Dialog close, 'Open' Button will be shown
  public modalDlgClose: EmitType<object> = () => {
      document.getElementById('modalbtn').style.display = '';
  }
  // On Dialog open, 'Open' Button will be hidden
  public modalDlgOpen: EmitType<object> = () => {
      document.getElementById('modalbtn').style.display = 'none';
  }

  // Close the Dialog, while clicking "OK" Button of Dialog
  public dlgButtonClick: EmitType<object> = () => {
      // this.modalDialog.hide();
      this.modalDialog.emit(this.isModal);
  }

  public overlayClick: EmitType<object> = () => {
      if (this.overlay.checked) {
          this.modalDialog.emit(this.isModal);
      }
  }

}

import {Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoteService} from "../../service/note/note.service";

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit, OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, public matDialogRef: MatDialogRef<NoteComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }


  onCloseDialog() {
    this.matDialogRef.close();
  }
  submit(){

  }
}

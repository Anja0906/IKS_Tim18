import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoteService} from "../../../service/note/note.service";

@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.css']
})
export class RejectionComponent implements OnInit, OnDestroy{
  @ViewChild('note') rejectionInput!: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, public matDialogRef: MatDialogRef<RejectionComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }


  onCloseDialog() {
    const textarea = this.rejectionInput.nativeElement;
    const text = textarea.value;
    this.noteService.addNote(text, this.data);
    this.matDialogRef.close();
  }

}


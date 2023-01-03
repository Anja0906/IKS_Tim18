import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NoteService} from "../../service/note/note.service";
import {Note} from "../../model/Note";

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent implements OnInit, OnDestroy{
  @ViewChild('note') noteInput!: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, public matDialogRef: MatDialogRef<NoteComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }


  onCloseDialog() {
    const textarea = this.noteInput.nativeElement;
    const text = textarea.value;
    this.noteService.addNote(text, this.data);
    this.matDialogRef.close();
  }

}

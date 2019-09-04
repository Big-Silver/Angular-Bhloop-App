import { Component, OnInit,OnDestroy,ViewEncapsulation,ViewChild,ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { pagesToggleService} from '../../services/toggler.service';
import {QuickviewService} from './quickview.service';
import {Note} from './note';
import {chatMessage,chatHistory} from './message';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuickviewComponent implements OnInit,OnDestroy {
  subscriptions: Array<Subscription> = [];
  isOpen:boolean = false;
  noteList = [];
  noteDeleteList = []
  //Single
  selectedNote:Note;
  noteText = "";
  //List for deleting or CRUD functions
  deleteNoteMode:boolean = false;
  isNoteOpen = false;
  userList = [];
  chatHistory:chatHistory;
  userMessage;
  newMessage:chatMessage;

  @ViewChild('chatHistoryWrapper') chatHistoryWrapper: ElementRef;

  constructor(private _service: QuickviewService, private http: HttpClient, private toggler:pagesToggleService) {
    this.subscriptions.push(this.toggler.quickViewToggle.subscribe(message => { this.toggle() }));
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    for(const sub of this.subscriptions){
      sub.unsubscribe();
    }
  }
  ngOnInit() {
    // Retrieve posts from the API
    this.subscriptions.push(this._service.getNotes().subscribe(notes => {
      this.noteList = notes;
    }));
  
    this.subscriptions.push(this._service.getUsers().subscribe(users => {
      this.userList = users;
    }));

    this.subscriptions.push(this._service.getChatMessages().subscribe(messages => {
      this.chatHistory = messages;
    }));
  }
   toggle() {
    if(this.isOpen){
    	this.isOpen = false
    }
    else{
    	this.isOpen = true;
    }
  }

  popNote(item:Note):void{
    const index = this.noteDeleteList.indexOf(item);
    if (index !== -1) {
      this.noteDeleteList.splice(index, 1);
    }
  }

  pushNote(item:Note):void{
    this.noteDeleteList.push(item);
  }

  onSelectNote(item: Note): void {
    if(!this.deleteNoteMode){
      this.selectedNote = item;
      this.noteText = this.selectedNote.notes
      this.isNoteOpen = true;
    }
    
  }
  toggleNotesView():void{
    if(this.isNoteOpen){
      this.isNoteOpen = false;
      this.saveNote()
    }
    else
      this.isNoteOpen = true;
  }

  onCheck(e,item:Note):void{
    if(e.target.checked){
      this.pushNote(item);
    }else{
      this.popNote(item);
    }
  }

  composeNote():void{
    this.isNoteOpen = true;
    this.selectedNote = new Note;
    this.selectedNote.id = this.noteList.length + 1;
    this.selectedNote.date =  new Date();
    this.selectedNote.notes = "";
    this.noteText = "";
    this.noteList.push(this.selectedNote);
  }

  saveNote():void{
    this.selectedNote.notes = this.noteText;
  }

  deleteMode():void{
    if(this.deleteNoteMode)
      this.deleteNoteMode = false;
    else
      this.deleteNoteMode = true;
  }

  deleteNote():void{
    this.noteList = this.noteList.filter(item => this.noteDeleteList.indexOf(item)  === -1);
  }

  onMessageKeyPress(event){
    if (event.keyCode == 13) {
      if(this.userMessage){
        this.newMessage = new chatMessage;
        this.newMessage.from = "me";
        this.newMessage.date = "";
        this.newMessage.message = this.userMessage;
        this.chatHistory["log"].push(this.newMessage);
        this.userMessage = "";
        this.chatHistoryWrapper.nativeElement.scrollTop = this.chatHistoryWrapper.nativeElement.scrollHeight;
      }
    }
  }
}

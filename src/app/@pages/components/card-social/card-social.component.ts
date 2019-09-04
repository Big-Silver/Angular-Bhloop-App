import {
    Component,
    Input,
    ViewEncapsulation,
    ElementRef,
    ViewChild,
    TemplateRef,
    ContentChild,
    EventEmitter,
    Output
  } from '@angular/core';

  @Component({
    selector     : 'pgcardsocial',
    encapsulation: ViewEncapsulation.None,
    templateUrl : './card-social.component.html'
  })
  export class pgCardSocial {
    _title:string = "";
    _titleClass:string = "text-complete";
    _type:string = "text";
    _comments:string = "";
    _likes:string = "";
    _body:string = "";
    _timestamp:string = "";
    _source:string = "";
    _image:string = "";
    _author:string = "";
    _activity:string = "";
    _location:string = "";

    _additionalClasses = "";
    
    @ViewChild('hostContent') _hostContent: ElementRef;
    @ContentChild('CustomBody') CustomBody: TemplateRef<void>;
    @ContentChild('AuthorAvatar') AuthorAvatar: TemplateRef<void>;

    @Input()
    set Title(value:string){
      this._title = value
    }

    @Input()
    set TitleClass(value:string){
      this._titleClass = value
    }

    @Input()
    set Type(value:string){
      this._type = value;
    }

    @Input()
    set Comments(value:string){
      this._comments = value;
    }

    @Input()
    set Likes(value:string){
      this._likes = value;
    }

    @Input()
    set Body(value:string){
      this._body = value;
    }

    @Input()
    set Timestamp(value:string){
      this._timestamp = value;
    }

    @Input()
    set Source(value:string){
      this._source = value;
    }

    @Input()
    set Author(value:string){
      this._author = value;
    }

    @Input()
    set Activity(value:string){
      this._activity = value;
    }

    @Input()
    set Image(value:string){
      this._image = value;
    }

    @Input()
    set Location(value:string){
      this._location = value;
    }

    @Input()
    set AdditionalClasses(value:string){
      this._additionalClasses = value;
    }
  }
  
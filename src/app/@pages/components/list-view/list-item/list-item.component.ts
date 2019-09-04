import { Component, OnInit ,ContentChild,TemplateRef, ViewChild} from '@angular/core';
import { ListViewContainerComponent } from '../list-view-container/list-view-container.component'
@Component({
  selector: 'pg-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @ContentChild('ItemHeading') _itemHeading: TemplateRef<void>;
  @ViewChild(TemplateRef) _content: TemplateRef<void>;

  get content(): TemplateRef<void> | null {
    return this._content;
  }


  constructor(private pgItemView: ListViewContainerComponent) {
  }

  ngOnInit(): void {
    this.pgItemView._items.push(this);
  }

  ngOnDestroy(): void {
    this.pgItemView._items.splice(this.pgItemView._items.indexOf(this), 1);
  }


}

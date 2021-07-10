import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';

export interface StepItem {
  name: string;
  detail: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  @ViewChildren('step') stepItems!: QueryList<ElementRef>;

  items!: StepItem[];
  current!: number;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.items = [
      { name: 'aa', detail: 'aaaaaaa' },
      { name: 'bb', detail: 'bbbbbbb' },
      { name: 'cc', detail: 'ccccccc' },
      { name: 'dd', detail: 'ddddddd' }
    ];

    this.current = 2;
  }

  ngAfterViewInit(): void {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += '1fr ';
    }
    str = str.slice(0, -1);
    this.renderer.setStyle(
      this.container.nativeElement,
      'grid-template-columns',
      str
    );
    this.setActive();
  }

  private setActive() {
    this.stepItems.forEach((item, index) => {
      if (index > this.current - 1) return;
      item.nativeElement.classList.add('active');
    });
  }
}

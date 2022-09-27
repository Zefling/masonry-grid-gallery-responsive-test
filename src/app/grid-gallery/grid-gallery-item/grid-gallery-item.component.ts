import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatGridTile } from '@angular/material/grid-list';


@Component({
  selector: 'app-grid-gallery-item',
  templateUrl: './grid-gallery-item.component.html',
  styleUrls: ['./grid-gallery-item.component.scss'],
})
export class GridGalleryItemComponent {
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @Input() matGrid!: MatGridTile;
  @Output() updateSize = new EventEmitter<void>();
  @ViewChild('block') block!: ElementRef;

  constructor(private ref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const resizeObserver = new ResizeObserver((entries) => {
      console.log('Size changed');

      if (
        this.matGrid &&
        this.block.nativeElement &&
        this.rowHeight + this.gutterSize
      ) {
        this.matGrid.rowspan = Math.floor(
          this.block.nativeElement.offsetHeight /
            (this.rowHeight + this.gutterSize)
        );
        this.updateSize.emit();
      }
    });

    resizeObserver.observe(this.block.nativeElement);
  }
}

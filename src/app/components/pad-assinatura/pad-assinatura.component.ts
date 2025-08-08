import {
  AngularSignaturePadModule,
  NgSignaturePadOptions,
  SignaturePadComponent,
} from '@almothafar/angular-signature-pad';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [AngularSignaturePadModule, IonButton],
  selector: 'app-pad-assinatura',
  templateUrl: './pad-assinatura.component.html',
  styleUrls: ['./pad-assinatura.component.scss'],
})
export class PadAssinaturaComponent implements AfterViewInit {
  @ViewChild('signature') signaturePad!: SignaturePadComponent;
  @ViewChild('signatureContainer') signatureContainer!: ElementRef;
  @ViewChild('signature', { read: ElementRef })
  signatureElementRef!: ElementRef;

  @Input() options: NgSignaturePadOptions = {
    minWidth: 2,
    backgroundColor: 'white',
    penColor: 'black',
  };

  @Output() drawStart = new EventEmitter<void>();
  @Output() drawEnd = new EventEmitter<void>();

  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.resizeCanvas();
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
      });
      this.resizeObserver.observe(this.signatureContainer.nativeElement);
    }, 100);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private resizeCanvas(): void {
    const container = this.signatureContainer.nativeElement;
    const canvas: HTMLCanvasElement | null =
      this.signatureElementRef.nativeElement.querySelector('canvas');

    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    this.signaturePad.clear();
  }

  clear(): void {
    this.signaturePad.clear();
  }

  save(): string | null {
    return this.signaturePad.isEmpty() ? null : this.signaturePad.toDataURL();
  }

  onDrawStart(): void {
    this.drawStart.emit();
  }

  onDrawEnd(): void {
    this.drawEnd.emit();
  }
}

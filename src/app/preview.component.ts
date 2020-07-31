import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  template: `
    <div class="preview-markdown">
      <markdown [data]="previewData"></markdown>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent {
  @Input() previewData!: string;
}

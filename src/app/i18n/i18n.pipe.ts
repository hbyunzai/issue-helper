import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { I18nService } from './i18n.service';

@Pipe({ name: 'i18n' })
export class I18nPipe implements PipeTransform {
  constructor(private srv: I18nService, private dom: DomSanitizer) {}

  transform(key: string): SafeHtml {
    const html = this.srv.get(key);
    return this.dom.bypassSecurityTrustHtml(html);
  }
}

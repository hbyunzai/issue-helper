import { Directive, HostListener } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';

import { I18nService } from '../i18n/i18n.service';

@Directive({
  selector: '[click-link]'
})
export class ClickLinkDirective {
  constructor(private i18n: I18nService, private modal: NzModalService) {}

  @HostListener('click', ['$event'])
  _click(ev: MouseEvent): void {
    const el = ev.target as HTMLLinkElement;
    const hrefAttr = el.getAttribute('href');
    if (el.tagName !== 'A' || hrefAttr == null || !hrefAttr.startsWith('#')) {
      return;
    }
    const key = hrefAttr.substr(1);
    const html = this.i18n.get(`md-${key}`);
    if (!html) {
      return;
    }

    setTimeout(() => {
      this.modal.create({
        nzTitle: el.textContent?.trim(),
        nzContent: html,
        nzFooter: null
      });
    });
  }
}

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { I18nService, LANG } from './i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private i18n$!: Subscription;
  local: { [key: string]: string } = {};
  get lang(): LANG {
    return this.i18n.lang;
  }

  constructor(private i18n: I18nService, private cdr: ChangeDetectorRef) {}

  changeLang(): void {
    this.i18n.use(this.i18n.lang === 'en' ? 'zh' : 'en');
  }

  ngOnInit(): void {
    this.i18n$ = this.i18n.change.subscribe(data => {
      this.local = data;
      this.cdr.detectChanges();
    });
    if (location.hash.includes('#zh')) {
      this.i18n.use('zh');
    }
  }

  ngOnDestroy(): void {
    this.i18n$.unsubscribe();
  }
}

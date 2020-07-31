import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import en from '../../locales/en.json';
import enModal from '../../locales/en/index.json';
import zh from '../../locales/zh.json';
import zhModal from '../../locales/zh/index.json';

const DATA = {
  en: {
    ...en,
    ...enModal
  },
  zh: {
    ...zh,
    ...zhModal
  }
};

export type LANG = 'en' | 'zh';
export const DEFAULT: LANG = 'en';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private _data: { [key: string]: string } = {};
  private _lang: LANG = DEFAULT;
  private change$ = new BehaviorSubject<{ [key: string]: string }>({});

  get change(): Observable<{ [key: string]: string }> {
    return this.change$.pipe(share());
  }

  get lang(): LANG {
    return this._lang;
  }

  get data(): { [key: string]: string } {
    return this._data;
  }

  constructor() {
    this.use(DEFAULT);
  }

  use(lang: LANG): void {
    this._lang = lang;
    this._data = DATA[lang];
    this.change$.next(this._data);
  }

  get(key: string): string {
    return this.data[key] || key;
  }
}

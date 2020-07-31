import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GithubOutline, BugOutline } from '@ant-design/icons-angular/icons';
import { MarkdownModule } from 'ngx-markdown';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AppComponent } from './app.component';
import { ClickLinkDirective } from './directives/click-link.directive';
import { AppFormComponent } from './form.component';
import { I18nPipe } from './i18n/i18n.pipe';
import { HTMLPipe } from './pipes/html.pipe';
import { PreviewComponent } from './preview.component';

@NgModule({
  declarations: [AppComponent, AppFormComponent, I18nPipe, ClickLinkDirective, HTMLPipe, PreviewComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    NzIconModule.forRoot([GithubOutline, BugOutline]),
    NzGridModule,
    NzButtonModule,
    NzLayoutModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

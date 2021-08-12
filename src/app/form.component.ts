import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { NzModalService } from 'ng-zorro-antd/modal';

import { PreviewComponent } from './preview.component';
import { GithubService } from './services/github.service';
import { getBugTemplate, getFeatureTemplate, REP_LINK_REGEXP, PREVENT_COPY_LINK } from './util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFormComponent implements OnInit, OnDestroy {
  private searchSubject$ = new Subject<string | null>();
  private searchSubjection: Subscription | null = null;
  private confirmMarkdown = '';
  private issueBugForm!: FormGroup;
  private issueFeatureForm!: FormGroup;
  issueType: 'bug' | 'feature' = 'bug';
  repositories = ['ng-yunzai', 'yelon'];
  versions: string[] = [];
  searchIssues: Array<{ html_url: string; title: string }> = [];

  @Input() l: { [key: string]: string } = {};

  get issueForm(): FormGroup {
    return this.issueType === 'bug' ? this.issueBugForm : this.issueFeatureForm;
  }

  constructor(
    private fb: FormBuilder,
    private githubSrv: GithubService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.issueBugForm = this.fb.group({
      repository: ['ng-yunzai', [Validators.required]],
      issue_title: ['', [Validators.required]],
      version: ['', [Validators.required]],
      browser: ['', [Validators.required]],
      reproduction: ['', [this.replinkValidator]],
      steps: ['', [Validators.required]],
      expected: ['', [Validators.required]],
      actually: ['', [Validators.required]],
      extra: ['']
    });
    this.issueFeatureForm = this.fb.group({
      repository: ['ng-yunzai', [Validators.required]],
      issue_title: ['', [Validators.required]],
      motivation: ['', [Validators.required]],
      proposal: ['', [Validators.required]]
    });
    // 版本
    this.fetchReleases();
    // 查询
    this.searchSubjection = this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged()).subscribe(q => {
      this.searchIssues = [];
      this.cdr.detectChanges();
      if (!q) {
        return;
      }
      this.githubSrv.fetchIssues(q).subscribe((issues: { items?: Array<{ html_url: string; title: string }> }) => {
        this.searchIssues = issues.items || [];
        this.cdr.detectChanges();
      });
    });
  }

  private getFormControl(name: string): AbstractControl {
    return this.issueForm.controls[name];
  }

  replinkValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (!REP_LINK_REGEXP.test(control.value) || PREVENT_COPY_LINK.test(control.value)) {
      return { error: true, repLink: true };
    }
    return null;
  };

  changeType(): void {
    this.searchSubject$.next(null);
  }

  searchOnChange(q: string): void {
    this.searchSubject$.next(q);
  }

  submitFormPreview(): void {
    this.confirmMarkdown = '';
    // tslint:disable-next-line: forin
    for (const i in this.issueForm.controls) {
      this.issueForm.controls[i].markAsDirty();
      this.issueForm.controls[i].updateValueAndValidity();
    }
    if (this.issueForm.invalid) {
      return;
    }

    switch (this.issueType) {
      case 'bug':
        this.confirmMarkdown = getBugTemplate(this.issueBugForm.value);
        break;
      case 'feature':
        this.confirmMarkdown = getFeatureTemplate(this.issueFeatureForm.value);
        break;
    }

    this.modalService.create({
      nzTitle: this.l['previewModal.title'],
      nzMaskClosable: false,
      nzWidth: 680,
      nzContent: PreviewComponent,
      nzOkText: this.l['issue.create'],
      nzCancelText: null,
      nzStyle: {
        top: '40px'
      },
      nzComponentParams: {
        previewData: this.confirmMarkdown
      },
      nzOnOk: () => {
        this.submitForm();
      }
    });
  }

  private submitForm(): void {
    const label = this.issueType === 'feature' ? '&labels=type:feature' : '';
    this.confirmMarkdown = `${this.confirmMarkdown}<!-- generated by ng-yunzai-issue-helper. DO NOT REMOVE -->`;
    const body = encodeURIComponent(this.confirmMarkdown).replace(/%2B/gi, '+');
    const title = encodeURIComponent(this.getFormControl('issue_title').value);
    window.open(`https://github.com/hbyunzai/${this.issueForm.value.repository}/issues/new?title=${title}&body=${body}${label}`);
  }

  private fetchReleases(): void {
    this.githubSrv.fetchReleases().subscribe((data: Array<{ tag_name: string }>) => {
      this.versions = data.map(v => v.tag_name);
      this.issueBugForm.controls.version.setValue(this.versions[0]);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubjection) {
      this.searchSubjection.unsubscribe();
      this.searchSubjection = null;
    }
  }
}

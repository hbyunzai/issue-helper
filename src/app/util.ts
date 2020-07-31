// 匹配预定复现网址
// tslint:disable-next-line:max-line-length
export const REP_LINK_REGEXP =
  /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*(stackblitz|github|codesandbox)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+/;
// 现有网址不可完全复制
export const PREVENT_COPY_LINK =
  /^(https?:\/\/)?((stackblitz\.com\/edit\/ng-zorro-antd-ivy)|(ng-zorro-antd-ivy\.stackblitz\.io)|(codesandbox.io\/s\/ng-zorro-antd-ivy-mp18k))\/?$/i;

export function getBugTemplate(bugFormValue: { [key: string]: string }): string {
  const { reproduction, steps, expected, actually, version, browser, extra } = bugFormValue;
  return `
### Reproduction link
[${reproduction}](${reproduction})

### Steps to reproduce
${steps}

### What is expected?
${expected}

### What is actually happening?
${actually}

| Environment | Info |
|---|---|
| ng-yunzai | ${version} |
| Browser | ${browser} |

${extra ? `---\n${extra}` : ''}

`;
}

export function getFeatureTemplate(featFormValue: { [key: string]: string }): string {
  const { motivation, proposal } = featFormValue;
  return `
## What problem does this feature solve?
${motivation}

## What does the proposed API look like?
${proposal}

`;
}

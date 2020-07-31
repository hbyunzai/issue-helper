#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');

const root = path.resolve(__dirname, `..`);

function genMarkdown(dir) {
  const res = {};
  fs.readdirSync(dir)
    .filter(v => v.endsWith('.md'))
    .forEach(mdPath => {
      const content = fs.readFileSync(path.join(dir, mdPath)).toString('utf8');
      const html = marked(content);
      res[`md-${mdPath.replace('.md', '')}`] = html;
    });
  return res;
}

function main() {
  ['en', 'zh'].forEach(v => {
    const dir = path.join(root, 'src', 'locales', v);
    fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(genMarkdown(dir), null, 2));
  });
}

main();

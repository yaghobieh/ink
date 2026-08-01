export type InkAngularValueChange = (html: string) => void;

export interface InkAngularBindings {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  typoAutoFix?: boolean;
  onChange?: InkAngularValueChange;
}

export const INK_ANGULAR_SELECTOR = 'ink-editor';

export const createInkAngularUsage = (): string => `
import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  template: \`
    <div
      id="ink-host"
      [attr.data-value]="html"
      contenteditable="false"
    ></div>
  \`,
})
export class EditorHostComponent {
  html = '<p>Start typing with Ink…</p>';
}

// Mount the React InkEditor into #ink-host with your preferred bridge
// (e.g. @angular/elements, react2angular, or a small custom adapter).
// Example:
//
// import { createRoot } from 'react-dom/client';
// import { InkEditor } from '@forgedevstack/ink';
// import '@forgedevstack/ink/styles.css';
//
// const root = createRoot(document.getElementById('ink-host')!);
// root.render(
//   <InkEditor value={html} onChange={(next) => { this.html = next; }} />
// );
`.trim();

export const documentInkAngularAdapter = (): {
  packageEntry: string;
  status: 'stub';
  note: string;
} => ({
  packageEntry: '@forgedevstack/ink/angular',
  status: 'stub',
  note: 'Thin Angular usage docs + helper constants for 1.0.0. A dedicated @angular/core wrapper lands in 1.x.',
});

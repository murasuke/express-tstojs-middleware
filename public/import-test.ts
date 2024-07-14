import { i_concat } from './import-lib.ts';
const app: HTMLElement | null = document.getElementById('app');
if (app) {
  const message = i_concat('hello module', ' tsToJs test');
  const helloNode: Text = document.createTextNode(message);
  app.appendChild(helloNode);
}

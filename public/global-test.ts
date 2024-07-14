const app: HTMLElement | null = document.getElementById('app');
if (app) {
  const message = g_concat('hello conventional', ' tsToJs test');
  const helloNode: Text = document.createTextNode(message);
  app.appendChild(helloNode);
}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
// bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  
// Custom Cursor
// const cursor = document.getElementsByClassName('cursor');
// const editCursor = (e: { clientX: number; clientY: number; }) => {
//     const { clientX: x, clientY: y } = e;
//     cursor[0]?.setAttribute("style", "left:"+x + "px; top: "+y + "px;");
// };
// window.addEventListener('mousemove', editCursor);
// Custom Cursor End
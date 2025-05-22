import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js')
        .then((registration) => {
          console.log('Service Worker registration successful:', registration);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  })
  .catch((err) => console.error(err));

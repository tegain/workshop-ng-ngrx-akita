import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { StoreModule } from './app/store/store.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // Désactive les logs en production
  StoreModule.enableProductionMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

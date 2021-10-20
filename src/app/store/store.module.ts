import { NgModule } from '@angular/core';
import { enableAkitaProdMode } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../../environments/environment';
import { HeroStore } from './hero/hero.store';
import { MessageStore } from './message/message.store';

@NgModule({
  // Devtools
  imports: [
    environment.production
      ? []
      : AkitaNgDevtools.forRoot({ name: 'Angular Heroes Akita'})
  ],
  providers: [HeroStore, MessageStore]
})
export class StoreModule {
  static enableProductionMode() {
    return enableAkitaProdMode();
  }
}

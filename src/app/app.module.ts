import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SF_MODULES } from './sf-modules';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MtSampleNavComponent } from './mt-sample-exercise/mt-sample-nav.component';
import { SAMPLE_COMPONENTS } from './mt-sample-exercise';
import { MtAutoCompleteComponent } from './mt-autocomplete/mt-autocomplete.component';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SF_MODULES,
    RouterModule.forRoot([
      { path: 'list-detail', component: MtSampleNavComponent },
      { path: 'auto-complete', component: MtAutoCompleteComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    SAMPLE_COMPONENTS,
    MtAutoCompleteComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

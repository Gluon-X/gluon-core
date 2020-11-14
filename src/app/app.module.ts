import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { QuizModule } from './feature_modules/quiz'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from './shared'
import { RouterModule } from '@angular/router'
import { ChapterModule } from './feature_modules/chapter'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ChapterModule,
    AppRoutingModule,
    FormsModule,
    QuizModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

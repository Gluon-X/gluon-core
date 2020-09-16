import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { QuizModule } from './feature_modules/quiz'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, QuizModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

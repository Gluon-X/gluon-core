import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PrimaryButtonComponent } from './components/buttons/primary-button.component'

@NgModule({
  imports: [CommonModule],
  declarations: [PrimaryButtonComponent],
  exports: [PrimaryButtonComponent],
})
export class SharedModule {}

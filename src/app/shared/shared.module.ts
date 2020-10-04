import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { GButtonComponent } from './components/buttons/g-button.component'
import { GInputComponent } from './components/inputs/g-input.component'
import { GNavBarComponent } from './components/navigation/g-navbar.component'

const shareComponents = [GButtonComponent, GNavBarComponent, GInputComponent]

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [shareComponents],
  exports: [shareComponents],
})
export class SharedModule {}

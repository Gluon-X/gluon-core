import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { GButtonComponent } from './components/buttons/g-button.component'
import { GInputComponent } from './components/inputs/g-input.component'
import { GNavBarComponent } from './components/navigation/g-navbar.component'
import { StepperComponent } from './components/stepper/stepper.component'

const shareComponents = [
  GButtonComponent,
  GNavBarComponent,
  GInputComponent,
  StepperComponent,
]

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [shareComponents],
  exports: [shareComponents],
})
export class SharedModule {}

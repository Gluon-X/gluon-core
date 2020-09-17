import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-phase-indicator',
  template: ` <div>Phase {{ currentPhase }} / {{ phasesCount }}</div>`,
  styles: [``],
})
export class PhaseIndicatorComponent {
  @Input()
  phasesCount = 0

  @Input()
  currentPhase = 0
}

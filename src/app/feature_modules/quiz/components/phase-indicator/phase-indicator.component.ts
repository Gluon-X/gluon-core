import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-phase-indicator',
  template: ``,
  styles: [``],
})
export class PhaseIndicatorComponent {
  @Input()
  public phasesCount = 0

  @Input()
  public currentPhase = 0
}

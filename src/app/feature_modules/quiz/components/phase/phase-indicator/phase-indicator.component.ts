import { Component, Input, OnChanges, OnInit } from '@angular/core'

@Component({
  selector: 'app-phase-indicator',
  template: ` <div>Phase {{ currentPhase }} / {{ phasesCount }}</div>`,
  styles: [``],
})
export class PhaseIndicatorComponent implements OnChanges {
  @Input()
  phasesCount = 0

  @Input()
  currentPhase = 0

  ngOnChanges(): void {
    if (this.currentPhase < 1 || this.currentPhase > this.phasesCount)
      throw new Error(
        `Error: current phase indicator cannot be negative or greater than phases count; phase ${this.currentPhase} / ${this.phasesCount}`
      )
  }
}

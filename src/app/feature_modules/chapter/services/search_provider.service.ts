import { Injectable } from '@angular/core'

export interface ValueStorable {
  value?: string
}

@Injectable()
export class SearchService implements ValueStorable {
  value?: string = ''

  get isSearchActive(): boolean {
    return this.value?.length > 0
  }

  dismiss() {
    this.value = undefined
  }
}

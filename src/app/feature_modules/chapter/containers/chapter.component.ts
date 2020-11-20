import { Component } from '@angular/core'

@Component({
  selector: 'app-gluon-chapter',
  template: `
    <div class="w-100 h-100">
      <app-navbar></app-navbar>

      <div class="h-2 md:h-8"></div>

      <div class="flex flex-col px-2 divide-y-2 md:divide-y-0 md:flex-row xl:px-0">
        <div class="block pb-4 flex-1 md:flex-none md:pb-0">

          <app-list *ngFor="let grade of gradesNavigations; let i = index"
                    [grade]="grade"
                    (pick)="onChapterPick(i, $event)"
                    (collapse)="grade.isActive = !grade.isActive"
          ></app-list>

        </div>

        <div class="flex-1 pt-4 px-2 md:pt-0 md:px-0 md:px-4 lg:px-0 lg:pl-8">
          <article class="subpixel-antialiased">
            <h1 class="font-bold font-serif text-2xl md:text-4xl">Chương 1: Sóng âm</h1>
            <p class="text-base font-normal text-justify py-6">
              For years parents have espoused the health benefits of eating garlic bread with cheese to their
              children, with the food earning such an iconic status in our culture that kids will often dress
              up as warm, cheesy loaf for Halloween.
            </p>
          </article>

          <app-exercise-list></app-exercise-list>

          <div class="h-2 md:h-8"></div>
        </div>
      </div>
    </div>
  `
})
export class ChapterComponent {

  gradesNavigations: GradeNav[] = [{
    name: 'Lớp Mười',
    isActive: true,
    chapters: [{
      name: 'Chương 1 - Động lực học chất điểm',
      isActive: true
    }, {
      name: 'Chương 2 - Sóng âm',
      isActive: false
    }, {
      name: 'Chương 3 - Sóng điện từ',
      isActive: false
    }]
  }, {
    name: 'Lớp Mười Một',
    isActive: true,
    chapters: [{
      name: 'Chương 1 - Lorem ipsum',
      isActive: false
    }, {
      name: 'Chương 2 - Sóng âm',
      isActive: false
    }, {
      name: 'Chương 3 - Sóng âm',
      isActive: false
    }]
  }, {
    name: 'Lớp Mười Hai',
    isActive: true,
    chapters: [{
      name: 'Chương 1 - Lorem ipsum',
      isActive: false
    }, {
      name: 'Chương 2 - Sóng âm',
      isActive: false
    }, {
      name: 'Chương 3 - Sóng âm',
      isActive: false
    }]
  }]

  onChapterPick(gradeIndex: number, chapterIndex: number) {
    for (let gradeCounter = 0; gradeCounter < this.gradesNavigations.length; gradeCounter++) {
      const chapters = this.gradesNavigations[gradeCounter].chapters

      for (let chapterCounter = 0; chapterCounter < chapters.length; chapterCounter++)
        chapters[chapterCounter].isActive = gradeIndex === gradeCounter && chapterIndex === chapterCounter
    }
  }
}

export interface GradeNav {
  name: string,
  isActive: boolean,
  chapters: ChapterNav[]
}

export interface ChapterNav {
  name: string,
  isActive: boolean
}

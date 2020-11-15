import { Component, Input } from '@angular/core'


@Component({
  selector: 'app-gluon-chapter',
  template: `
    <div>
      <app-navbar></app-navbar>

      <!--      <app-sample-navbar></app-sample-navbar>-->

      <div class="h-8"></div>

      <div class="flex">
        <div class="w-1/4 flex-none block flex-shrink-0 flex-grow-0">

          <app-list *ngFor="let grade of gradesNavigations; let i = index"
                    [grade]="grade"
                    (pick)="onChapterPick(i, $event)"
                    (collapse)="grade.isActive = !grade.isActive"
          ></app-list>

        </div>

        <div class="flex-auto flex-shrink-0 flex-grow-0 w-3/4" style="padding-left: 48px;">
          <article class="subpixel-antialiased">
            <h1 class="font-bold font-serif text-4xl">Chương 1: Sóng âm</h1>
            <p class="text-base font-normal text-justify py-6">
              For years parents have espoused the health benefits of eating garlic bread with cheese to their
              children, with the food earning such an iconic status in our culture that kids will often dress
              up as warm, cheesy loaf for Halloween.
            </p>
          </article>

          <app-exercise-list></app-exercise-list>

          <div class="h-8"></div>
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

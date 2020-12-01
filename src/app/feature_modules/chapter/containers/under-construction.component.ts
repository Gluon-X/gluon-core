import { Component } from '@angular/core'

@Component({
  selector: 'app-under-construction',
  template: `
    <div class="flex flex-col justify-center items-center font-sans">
      <img src="../../../../assets/images/Illustrations/App Development.png" alt="Under construction" class="object-contain w-2/4" />
      <span class="font-black text-4xl text-center mb-2 mt-4 subpixel-antialiased" style="color: #f15634">Trang vẫn chưa sẵn sàng</span>
      <span
        class="text-gray-400 text-xl text-center font-normal subpixel-antialiased">Hãy thử sức một số bài tập trong lúc chúng tôi chuẩn bị mọi thứ nhé!</span>

      <button type="button" class="mt-4 py-2 px-4 rounded-md text-white focus:outline-none subpixel-antialiased"
              style="background-color: #f15634"
              routerLink="/practice/0/0">Okay!
        Let's
        go.
      </button>
    </div> `
})
export class UnderConstructionComponent {
}

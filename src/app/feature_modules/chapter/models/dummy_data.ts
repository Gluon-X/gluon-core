// Note: field `creationDate` and `lastEdited` are uneccessary yet, by now.
import { Chapter, Exercise, GradeNav } from './interfaces'

export const chapterFakeData: Chapter = {
  name: 'Sóng âm',
  chapterId: '',
  // This gradeId should be like number or someshit for better rendering
  gradeId: 'Lớp 11',
  thumbnailURL: '',
  description: `For years parents have espoused the health benefits of eating garlic \
  bread with cheese to their children, with the food earning such an \
  iconic status in our culture that kids will often dress up as warm, \
  cheesy loaf for Halloween.`,
  questions: [],
  relatedResources: []
}

const dummyText = `For years parents have espoused the health benefits of eating \
garlic bread with cheese to their children, with the food earning such an iconic \
status in our culture that kids will often dress up as warm, cheesy loaf for Halloween.`

export const grades: GradeNav[] = [
  {
    name: 'Lớp Mười',
    isActive: true,
    chapters: [
      {
        name: 'Chương 1 - Động lực học chất điểm',
        description: `Khi mọi thứ bé lại thành một điểm và chỉ một điểm. \
        Động học chất điểm nghiên cứu và mô tả chuyển động vật lý bằng các \
        phương trình toán học mà không xét tới nguyên nhân của chuyển động đó.`
      },
      {
        name: 'Chương 2 - Động lực học chất điểm',
        description: `Động lực học chất điểm cung cấp một cái nhìn tổng quát về \
        nguyên nhân chuyển động và cơ chế chuyển động. Với ba định luật của Newton, \
        chúng ta có thể du hành tới những thiên hà xa xôi để chứng kiến cách mà \
        vũ trụ chúng ta vận hành, và giải thích được nó.`
      },
      {
        name: 'Chương 3 - Cân bằng và chuyển động của vật rắn',
        description: `Acsimet từng nói, “Hãy cho ta một điểm tựa và một cái đòn bẩy, \
        ta sẽ nâng bổng cả thế giới.” Hãy xem liệu Acsimet có thể hiện thực hoá được \
        tuyên bố của ông?`
      },
      {
        name: 'Chương 4 - Các định luật bảo toàn',
        description: dummyText
      }
    ]
  },
  {
    name: 'Lớp Mười Một',
    isActive: true,
    chapters: [
      {
        name: 'Chương 1 - Lorem ipsum',
        description: ''
      },
      {
        name: 'Chương 2 - Sóng âm',
        description: dummyText
      },
      {
        name: 'Chương 3 - Sóng điện từ',
        description: dummyText
      }
    ]
  },
  {
    name: 'Lớp Mười Hai',
    isActive: true,
    chapters: [
      {
        name: 'Chương 1 - Lorem ipsum'
      },
      {
        name: 'Chương 2 - Sóng âm'
      },
      {
        name: 'Chương 3 - Sóng âm'
      }
    ]
  }
]

const exercises: Exercise[] = [
  Exercise.builder()
    .setName('Bài 1 - Động lực học chất điểm')
    .setActive(true)
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 1 - Lorem ipsum',
      image:
        '../../../../assets/images/Topology.png',
      description:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet overflow-hidden overflow-hidden overflow-hidden'
    })
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 2 - Lorem ipsum',
      image:
        '../../../../assets/images/Topo-Circle.png',
      description: 'Lorem ipsum dolor sit amet'
    })
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 3 - Lorem ipsum',
      image:
        '../../../../assets/images/Topo-Circle.png',
      description: 'Lorem ipsum dolor sit amet'
    })
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 3 - Lorem ipsum',
      image:
        '../../../../assets/images/Topo-Triangle.png',
      description: 'Lorem ipsum dolor sit amet'
    })
    .build(),

  Exercise.builder()
    .setName('Bài 2 - Động lực học chất điểm')
    .setActive(false)
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 4 - Lorem ipsum',
      image:
        '../../../../assets/images/Topo-Triangle.png',
      description: 'Lorem ipsum dolor sit amet'
    })
    .build()
]

export const sampleExercises: { [cid: string]: Exercise[] } = {
  L10C1: exercises,
  L11C2: exercises
}

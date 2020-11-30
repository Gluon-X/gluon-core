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
  relatedResources: [],
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
        description: dummyText,
      },
      {
        name: 'Chương 2 - Sóng âm',
        description: dummyText,
      },
      {
        name: 'Chương 3 - Sóng điện từ',
        description: dummyText,
      },
    ],
  },
  {
    name: 'Lớp Mười Một',
    isActive: true,
    chapters: [
      {
        name: 'Chương 1 - Lorem ipsum',
        description: '',
      },
      {
        name: 'Chương 2 - Sóng âm',
        description: dummyText,
      },
      {
        name: 'Chương 3 - Sóng điện từ',
        description: dummyText,
      },
    ],
  },
  {
    name: 'Lớp Mười Hai',
    isActive: true,
    chapters: [
      {
        name: 'Chương 1 - Lorem ipsum',
      },
      {
        name: 'Chương 2 - Sóng âm',
      },
      {
        name: 'Chương 3 - Sóng âm',
      },
    ],
  },
]

export const sampleExercises: Exercise[] = [
  Exercise.builder()
    .setName('Bài 1 - Động lực học chất điểm')
    .setActive(true)
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 1 - Lorem ipsum',
      image:
        'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-impossible-figure-512.png',
      description:
        'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet overflow-hidden overflow-hidden overflow-hidden',
    })
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 2 - Lorem ipsum',
      image:
        'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-torus-tore-01-512.png',
      description: 'Lorem ipsum dolor sit amet',
    })
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 3 - Lorem ipsum',
      image:
        'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-mobius-strip-512.png',
      description: 'Lorem ipsum dolor sit amet',
    })
    .build(),

  Exercise.builder()
    .setName('Bài 2 - Động lực học chất điểm')
    .setActive(false)
    .addProblem({
      qid: 'GID11060001',
      name: 'Problem 4 - Lorem ipsum',
      image:
        'https://cdn2.iconfinder.com/data/icons/topology-geometric-shapes-blue-line/64/143_topology-mathematics-math-impossible-figure-512.png',
      description: 'Lorem ipsum dolor sit amet',
    })
    .build(),
]

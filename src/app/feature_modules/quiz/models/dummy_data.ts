import { QuestionType } from './enums'
import { MainQuestion, PhaseStack, Question } from './interfaces'

export const realDummyData = {
  GID11060001: {
    title: 'Nón ánh sáng trong bể nước',

    content: `Đặt một bể kính chứa nước lên trên một tờ giấy rồi\
    chiếu một chùm tia laser vuông góc tới đáy bình\
    thì thấy xuất hiện một nón sáng (Hình vẽ dưới).\
    Cho biết chiết suất của nước là n1 ≈ 1.33 và kính\
    là n2 ≈ 1.52, hãy xác định giá trị góc mở đỉnh θ\
    của nón sáng này.`,

    correctAnswers: '97.5±0.5',

    availableAnswers: null,

    type: QuestionType.TEXT,

    helps: {
      // phase One
      phaseOne: {
        openQuestion: `Sau khi bị khúc xạ, chùm sáng lúc này \
        tiếp tục chiếu lên trên bề mặt nước, tạo thành nón \
        ánh sáng như đã quan sát. Vậy là chúng ta đã hiểu \
        một cách tường minh hiện tượng.`,
        subQuestions: [
          // first box
          {
            content: `Để giải quyết bài toán này, trước hết \
            bạn phải đoán biết được nguyên lý đằng sau hiện \
            tượng trong hình. Một cách trực giác, chúng ta có \
            thể dựa vào đường đi của tia laser để dự đoán hành \
            trạng của nó.
            Giả sử bề mặt nước là phẳng. Khi tia laser truyền \
            qua mặt phân cách không khí và nước, có hiện \
            tượng gì xảy ra không?`,
            correctAnswers: 2,
            availableAnswers: [
              'Hiện tượng khúc xạ',
              'Hiện tượng phản xạ toàn phần',
              'Chùm laser bị phản xạ một phần nhỏ, phần còn lại tiếp tục truyền thẳng xuống đáy bể',
            ],
            type: QuestionType.SINGLE_CHOICE,
          },
          // second box
          {
            content: `Tiếp tục. Khi ánh sáng truyền xuống \
            đáy bể, có hiện tượng gì xảy ra không?`,
            correctAnswers: 1,
            availableAnswers: [
              'Không. Tia sáng tiếp tục truyền thẳng',
              `Giống như ở mặt phân cách nước và không khí. \
              Chùm laser một phần bị phản xạ ngược trở lại, \
              một phần tiếp tục truyền xuống mặt dưới của đáy bể.`,
            ],
            type: QuestionType.SINGLE_CHOICE,
          },

          // third box
          {
            content: `Tiếp tục. Khi chùm laser truyền tới tờ giấy, có hiện \
            tượng gì xảy ra không?`,
            availableAnswers: [
              'Không. Chùm laser được hấp thu hoàn toàn bởi tờ giấy.',
              `Có. Chùm laser bị phản xạ toàn phần trở lại theo \
              phương thẳng đứng`,
              `Có. Bởi vì mặt giấy gồ ghề, nên chùm laser bằng \
              một cách nào đó có thể tán xạ ra đẳng hướng lên trên`,
            ],
            correctAnswers: 2,
            type: QuestionType.SINGLE_CHOICE,
          },

          // fourth box
          {
            content: `Sau khi đã biết rằng chùm tia laser khi đập vào mặt \
            giấy tiếp tục phản xạ đẳng hướng lên trên, chúng \
            ta tiếp tục nghiên cứu thêm vì sao các chùm tia bị \
            phản xạ này có thể tạo ra được hình ảnh được quan sát.
            Tại điểm laser đập vào tờ giấy và phản xạ lên trên, \
            chúng ta xem nó là một nguồn sáng thứ cấp. Một \
            cách trực giác, chúng ta có thể dự đoán được các \
            tia sáng từ nguồn sáng thứ cấp này khi đi qua các \
            môi trường ở trên thì xảy ra hiện tượng phản xạ \
            toàn phần, tạo ra nón ánh sáng được quan sáng. \
            Hãy cho biết khi chùm laser đi qua mặt phân cách \
            giữa không khí và đáy bể, góc tới lớn nhất xấp xỉ bao nhiêu?`,
            availableAnswers: null,
            correctAnswers: '90◦± 0',
            type: QuestionType.TEXT,
          },

          // fifth box
          {
            content: `Tia sáng này tiếp tục truyền tới mặt phân cách \
            giữa hai môi trường nước và kính. Lúc này tia sáng \
            lại bị ... ?`,
            correctAnswers: 'khúc xạ',
            availableAnswers: null,
            type: QuestionType.TEXT,
          },
        ] as Question[],
      } as PhaseStack,

      // phase Two
      phaseTwo: {
        openQuestion: 'Phân tích chiến thuật',
        subQuestions: [
          // seventh box
          {
            content: `Mục đích của chúng ta là tìm được \
            góc mở θ của nón ánh áng trong hình vẽ. Dựa vào \
            những phân tích ban đầu ở trên, chúng ta có thể \
            dễ dàng vẽ được sơ đồ mô tả hiện tượng như sau:`,
            imageURL: 'http://somewhereonearth.com/figure.svg',
            availableAnswers: [],
            correctAnswers: '?????????',
            type: QuestionType.TEXT,
          },

          // eight box
          {
            content: `Mục tiêu của chúng ta là tìm được giá trị của góc \
            θ với các giá trị của nwater, nglass, nair. Dễ thấy \
            liên hệ của các giá trị này có thể được tìm ra dựa \
            vào phương trình định luật Snell về khúc xạ ánh sáng.`,
            availableAnswers: [],
            correctAnswers: '?????????',
            type: QuestionType.TEXT,
          },
        ],
      },

      // phase Two
      phaseThree: {
        openQuestion: '',
        subQuestions: [
          // nineth box
          {
            content: `Đầu tiên, ta áp dụng phương trình định luật Snell \
            khi tia sáng truyền qua mặt phân cách giữa không \
            khí và kính. Chú ý rằng góc tới xấp xỉ 90◦. Ta \
            tính được góc của tia ló ra là`,
            availableAnswers: null,
            correctAnswers: '41, 14◦',
            type: QuestionType.TEXT,
          },

          // tenth box
          {
            content: `Tiếp theo, ta áp dụng phương trình định luật \
            Snell thêm một lần nữa khi tia sáng truyền qua \
            mặt phân cách giữa kính và nước. Với giá trị đã \
            tính được ở trên, góc α = ...`,
            correctAnswers: '',
            availableAnswers: null,
            type: QuestionType.TEXT,
          },
        ],
      },
    },

    followUpQuestions: [] as Question[],
  } as MainQuestion,
}

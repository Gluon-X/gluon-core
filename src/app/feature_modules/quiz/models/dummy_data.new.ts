import { MultipleChoices, Quiz, ShortAnswer } from './interfaces.new'
import { BoxType } from './enums.new'

export const realDummyData = {
  GID11060001: {
    title: 'Nón ánh sáng trong bể nước',

    core: {
      content: `Phương trình $\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$. \
      Đặt một bể kính chứa nước lên trên một tờ giấy rồi \
      chiếu một chùm tia laser vuông góc tới đáy bình \
      thì thấy xuất hiện một nón sáng (Hình vẽ dưới). \
      Cho biết chiết suất của nước là n1 ≈ 1.33 và kính \
      là n2 ≈ 1.52, hãy xác định giá trị góc mở đỉnh θ \
      của nón sáng này.`,
      answer: 97.5,
      approx: 0.5,
      type: BoxType.SHORT_ANSWER
    } as ShortAnswer,

    helps: [
      {
        title: 'Phân tích hiện tượng',
        content: '',
        boxes: [
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
            choices: [{
              content: 'Hiện tượng khúc xạ',
              isCorrect: false,
              explanation: `Bởi vì chùm laser \
              song song với pháp tuyến của mặt nước, nên tia \
              sáng không thể bị bẻ gãy khi qua mặt phân cách được.`
            }, {
              content: 'Hiện tượng phản xạ toàn phần',
              isCorrect: false,
              explanation: `Hai điều kiện để xảy ra hiện tượng phản xạ \
              toàn phần không được đáp ứng.`
            }, {
              content: 'Chùm laser bị phản xạ một phần nhỏ, phần còn lại tiếp tục truyền thẳng xuống đáy bể',
              isCorrect: true
            }],
            type: BoxType.MULTIPLE_CHOICES
          } as MultipleChoices,
          // second box
          {
            content: `Tiếp tục. Khi ánh sáng truyền xuống \
            đáy bể, có hiện tượng gì xảy ra không?`,
            choices: [{
              content: 'Không. Tia sáng tiếp tục truyền thẳng',
              isCorrect: false,
              explanation: 'Chưa chính xác'
            }, {
              content: `Giống như ở mặt phân cách nước và không khí. \
              Chùm laser một phần bị phản xạ ngược trở lại, \
              một phần tiếp tục truyền xuống mặt dưới của đáy bể.`,
              isCorrect: true,
              explanation: 'Chính xác'
            }],
            type: BoxType.MULTIPLE_CHOICES
          } as MultipleChoices,
          // third box
          {
            content: `Tiếp tục. Khi chùm laser truyền tới tờ giấy, có hiện \
            tượng gì xảy ra không?`,
            choices: [{
              content: 'Không. Chùm laser được hấp thu hoàn toàn bởi tờ giấy.',
              isCorrect: false,
              explanation: `Không chính xác. Nếu ánh sáng bị hấp \
              thụ hoàn toàn, hiện tượng như quan sát sẽ không xảy ra`
            }, {
              content: `Có. Chùm laser bị phản xạ toàn phần trở lại theo \
              phương thẳng đứng`,
              isCorrect: false,
              explanation: `Không chính xác. Chùm laser không thể \
              bị phản xạ toàn phần trong trường hợp này. \
              Thêm vào đó, nếu nó phản xạ theo phương thẳng đứng \
              thì hiện tượng như quan sát không thể xảy ra`
            }, {
              content: `Có. Bởi vì mặt giấy gồ ghề, nên chùm laser bằng \
              một cách nào đó có thể tán xạ ra đẳng hướng lên trên`,
              isCorrect: true,
              explanation: `Chính xác! Hình bên mô tả bề mặt của \
              một tờ giấy thông thường. Khác với mặt nước và \
              mặt thuỷ tinh, mặt phẳng của tờ giấy không luôn \
              "phẳng", chính vì thế mà chùm laser khi đập vào \
              mặt giấy tán xạ đẳng hướng lên trên`
            }],
            correctAnswers: 2,
            type: BoxType.MULTIPLE_CHOICES
          } as MultipleChoices,
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
            answer: 90,
            approx: 0,
            type: BoxType.SHORT_ANSWER
          } as ShortAnswer,

          // fifth box
          {
            content: `Tia sáng này tiếp tục truyền tới mặt phân cách \
            giữa hai môi trường nước và kính. Lúc này tia sáng \
            lại bị ... ?`,
            answer: 'khúc xạ',
            type: BoxType.SHORT_ANSWER
          } as ShortAnswer
        ]
      },
      {
        title: 'Phân tích chiến thuật',
        content: '',
        boxes: [{
          content: `Mục đích của chúng ta là tìm được \
            góc mở θ của nón ánh áng trong hình vẽ. Dựa vào \
            những phân tích ban đầu ở trên, chúng ta có thể \
            dễ dàng vẽ được sơ đồ mô tả hiện tượng như sau:`,
          type: BoxType.DISPLAY
        }, {
          content: `Mục tiêu của chúng ta là tìm được giá trị của góc \
            θ với các giá trị của nwater, nglass, nair. Dễ thấy \
            liên hệ của các giá trị này có thể được tìm ra dựa \
            vào phương trình định luật Snell về khúc xạ ánh sáng.`,
          type: BoxType.DISPLAY
        }]
      },
      {
        title: 'Phân tích định lượng',
        content: '',
        boxes: [
          // nineth box
          {
            content: `Đầu tiên, ta áp dụng phương trình định luật Snell \
            khi tia sáng truyền qua mặt phân cách giữa không \
            khí và kính. Chú ý rằng góc tới xấp xỉ 90◦. Ta \
            tính được góc của tia ló ra là`,
            availableAnswers: null,
            hint: 'nairsin(90◦) = nglasssin(rglass) → rglass = 41, 14◦',
            answer: 41.14,
            approx: 0,
            type: BoxType.SHORT_ANSWER
          } as ShortAnswer,

          // tenth box
          {
            content: `Tiếp theo, ta áp dụng phương trình định luật \
            Snell thêm một lần nữa khi tia sáng truyền qua \
            mặt phân cách giữa kính và nước. Với giá trị đã \
            tính được ở trên, góc α = ...◦`,
            hint: 'nglasssin(41, 14◦) = nwatersin(α) → α = 48, 75◦',
            answer: 48.75,
            approx: 0,
            type: BoxType.SHORT_ANSWER
          } as ShortAnswer
        ]
      }
    ],
    followUp: undefined
  } as Quiz
}

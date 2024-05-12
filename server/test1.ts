import mongoose from 'mongoose';
import { Question } from './src/models/mongodb/documents'
import config from './src/config/config';
import logger from './src/config/logger';
import { QuestionDocument } from 'models/mongodb/documents/question.model';
import { questionRepository } from './src/repositories';
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');
});
const id = '661b3ed8a157c590f798467f';
async function test() {
  const question = await questionRepository.getById('661b3ed8a157c590f798467f');
  console.log(await question?.getKeywords())
}

test()
// const keywords = 
// [
//     {
//       "word": "Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Diễn đàn Thanh niên ECOSOC",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Mỹ",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Nguyễn Ngọc Lương",
//       "named entity": "PER"
//     },
//     {
//       "word": "trung ương Đoàn",
//       "named entity": "LOC"
//     },
//     {
//       "word": "trung ương Hội Liên hiệp thanh niên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "thanh niên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Ngày 17.4",
//       "named entity": "LOC"
//     },
//     {
//       "word": "giờ New York",
//       "named entity": "LOC"
//     },
//     {
//       "word": "khuôn khổ Diễn đàn Thanh niên Hội đồng Kinh tế và xã hội Liên Hiệp Quốc",
//       "named entity": "LOC"
//     },
//     {
//       "word": "ECOSOC",
//       "named entity": "LOC"
//     },
//     {
//       "word": "đại biểu thanh niên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "năm 2050",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Hội nghị Thượng đỉnh COP26",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Đoàn TNCS Hồ Chí Minh",
//       "named entity": "PER"
//     },
//     {
//       "word": "Hội Liên hiệp thanh niên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "khuôn khổ Diễn đàn ECOSOC",
//       "named entity": "LOC"
//     },
//     {
//       "word": "đại biểu Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Sinh viên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "công tác Đoàn",
//       "named entity": "LOC"
//     },
//     {
//       "word": "Hội Thanh niên - Sinh viên Việt Nam",
//       "named entity": "LOC"
//     },
//     {
//       "word": "New York",
//       "named entity": "LOC"
//     }
//   ]

// const doc = `Thanh niên Việt Nam cam kết hành động mạnh mẽ ứng phó biến đổi khí hậu. Phát biểu tại Diễn đàn Thanh niên ECOSOC tại Mỹ, anh Nguyễn Ngọc Lương, Bí thư thường trực trung ương Đoàn, Chủ tịch trung ương Hội Liên hiệp thanh niên Việt Nam, cho biết thanh niên Việt Nam cam kết hành động mạnh mẽ ứng phó biến đổi khí hậu. Ngày 17.4 (giờ New York, Mỹ), trong khuôn khổ Diễn đàn Thanh niên Hội đồng Kinh tế và xã hội Liên Hiệp Quốc (ECOSOC) 2024, anh Nguyễn Ngọc Lương, Bí thư thường trực trung ương Đoàn, Chủ tịch trung ương Hội Liên hiệp thanh niên Việt Nam đã tham dự và có bài phát biểu quan trọng tại phiên toàn thể với chủ đề 'Thanh niên chung tay hành động ứng phó biến đổi khí hậu'. Anh Nguyễn Ngọc Lương bày tỏ vui mừng cùng đoàn đại biểu thanh niên Việt Nam tham dự Diễn đàn thanh niên toàn cầu về biến đổi khí hậu. 'Đây là vấn đề quan trọng, có ý nghĩa toàn cầu, ngày càng ảnh hưởng sâu sắc, nặng nề, đòi hỏi nhận thức, chung tay hành động của toàn cầu để cùng nhau giải quyết, trong đó thanh niên đóng vai trò rất quan trọng góp phần phát triển bền vững cho tương lai', anh Nguyễn Ngọc Lương đánh giá. Theo anh Nguyễn Ngọc Lương, Việt Nam đã cam kết đưa phát thải ròng về 0 vào năm 2050 tại Hội nghị Thượng đỉnh COP26. Với vai trò, vị trí của mình, Đoàn TNCS Hồ Chí Minh, Hội Liên hiệp thanh niên Việt Nam luôn xác định việc phát huy, tập hợp, vận động lực lượng to lớn của thanh niên, với thế mạnh về trí tuệ, sáng tạo và nhiệt huyết, là nhiệm vụ trọng tâm, chiến lược, cả trước mắt và lâu dài.'Chúng tôi đã nâng cao nhận thức cho người dân nói chung và thanh niên nói riêng thông qua các chiến dịch truyền thông, các lớp tập huấn, nổi bật trong đó là mô hình ngày Chủ nhật xanh được tổ chức đồng loạt. Chúng tôi đã thành lập các câu lạc bộ, đội hình, mạng lưới thanh niên bảo vệ môi trường, ứng phó biến đổi khí hậu từ cơ sở đến trung ương; xây dựng, hình thành và áp dụng các mô hình, ý tưởng, công trình bảo vệ môi trường, trong đó 'Nhà chống lũ' là một trong các mô hình tiêu biểu. Bên cạnh đó, chúng tôi tham gia tích cực vào việc trồng 1 tỉ cây xanh giai đoạn 2021 - 2025', anh Nguyễn Ngọc Lương khẳng định. Kết thúc bài phát biểu, Bí thư thường trực trung ương Đoàn, Chủ tịch trung ương Hội Liên hiệp thanh niên Việt Nam tuyên bố: 'Chúng tôi cam kết mạnh mẽ sẽ chung tay hành động quyết liệt, bằng những hành động cụ thể, hiệu quả để bảo vệ môi trường và ứng phó biến đổi khí hậu; đồng thời mong muốn hợp tác, chia sẻ, giúp đỡ lẫn nhau giữa các tổ chức, cá nhân bằng nguồn lực, công nghệ của mình, để cùng nhau xây dựng 1 thế giới phát triển bền vững trong tương lai'. Trước đó, cũng trong khuôn khổ Diễn đàn ECOSOC, đoàn đại biểu Việt Nam đã tham dự phiên khai mạc và phiên khu vực với chủ đề: 'Quan điểm của thanh niên về phát triển khu vực - thách thức, ưu tiên và hành động để thực hiện các Mục tiêu phát triển bền vững và Thập kỷ hành động. Dịp này, đoàn công tác của trung ương Đoàn, trung ương Hội Liên hiệp thanh niên Việt Nam do anh Nguyễn Ngọc Lương dẫn đầu, cũng đã có buổi gặp mặt, trao đổi với Hội Thanh niên - Sinh viên Việt Nam tại Mỹ. Tại buổi gặp, đoàn đã chia sẻ những chủ trương, định hướng công tác Đoàn và phong trào thanh niên; hướng dẫn triển khai công tác thanh niên ngoài nước; đồng thời lắng nghe tâm tư, nguyện vọng, ý kiến từ Hội Thanh niên - Sinh viên Việt Nam tại New York."`
// const getKeyWords = () => {
// }

// const computeTF_IDF = (doc, word) => {
//     const tf = computeTF(doc, word);
//     const idf = computeIDF(word);
//     return tf * idf;
// }

// const computeIDF = (word) => {
//     const totalDocs = getTotalDocs();
//     const docContainWord = getDocumentContainWord(word);
//     return getBaseLog(10, totalDocs / docContainWord);
// }

// const getBaseLog = (base, number) => {
//     return Math.log(number) / Math.log(base);
// }
  
// const getDocumentContainWord = (word) => {
//     return 1;
// }

// const getTotalDocs = () => {
//     return 1000;
// }

// const computeTF = (doc, wordToCount) => { 
//     const totalWords = doc.split(' ').length;
//     const count = countOccurrencesIgnoreCase(doc, wordToCount);
//     return count / totalWords;
// }

// const countOccurrencesIgnoreCase = (doc, wordToCount) => {
//     doc = doc.toLowerCase(); // Convert the entire string to lowercase
//     wordToCount = wordToCount.toLowerCase(); // Convert the substring to lowercase

//     if (wordToCount.length <= 0) return doc.length + 1;

//     let n = 0,
//         pos = 0,
//         step = wordToCount.length;

//     while (true) {
//         pos = doc.indexOf(wordToCount, pos);
//         if (pos >= 0) {
//             ++n;
//             pos += step;
//         } else break;
//     }

//     return n;
// }


// for (const word of keywords) {
//     console.log(word.word, computeTF_IDF(doc, word.word));
// }


// const html = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>'
// console.log(html.replace(/<\/?[^>]+(>|$)/g, "")); // Remove HTML tags


from underthesea import ner
import pandas as pd
from todo_api.normalization import normalize

# text = "Theo anh Nguyễn Ngọc Lương, Việt Nam đã cam kết đưa phát thải ròng về 0 vào năm 2050 tại Hội nghị Thượng đỉnh COP26. Với vai trò, vị trí của mình, Đoàn TNCS Hồ Chí Minh, Hội Liên hiệp thanh niên Việt Nam luôn xác định việc phát huy, tập hợp, vận động lực lượng to lớn của thanh niên, với thế mạnh về trí tuệ, sáng tạo và nhiệt huyết, là nhiệm vụ trọng tâm, chiến lược, cả trước mắt và lâu dài."
# tagged_words = ner(text)

def extract_keywords(paragraphs):
    keywords = normalize(paragraphs.lower())
    data_dict = {'word': keywords }
    df = pd.DataFrame(data_dict)    
    return df.to_json(orient='records', force_ascii=False)


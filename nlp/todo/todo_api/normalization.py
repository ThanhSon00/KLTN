from underthesea import word_tokenize
from underthesea import ner
import string

# Load Vietnamese stop words
with open('todo_api/vietnamese-stopwords.txt', 'r', encoding='utf-8') as file:
    stop_words = file.read().splitlines()

def remove_duplicates(input_list):
    seen = set()
    unique_list = []
    for item in input_list:
        if item not in seen:
            unique_list.append(item)
            seen.add(item)
    return unique_list

def tokenize_and_remove_stop_words(sentence):
    words = word_tokenize(sentence)
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return words, filtered_words

def normalize(paragraph):
    newSentence = paragraph.translate(str.maketrans('', '', string.punctuation))
    original, filtered = tokenize_and_remove_stop_words(newSentence)
    return remove_duplicates(filtered)
            


import { QuestionDocument } from "models/mongodb/documents/question.model";
import { Question } from "../models/mongodb/documents";
import { searchRepository } from "../repositories";

type SearchRow = {
    question: QuestionDocument,
    score: number,
    totalWordsMatch: number,
    totalWordsRelated: number,
}

export const fullTextSearch = async ({ text, amount, page }: { text: string, amount: number, page: number }) => {
    const rankingSearch: SearchRow[] = [];
    const words = await Question.getMeaningfulWords(text);
    const wordsToSearch = words.map(item => item.word);
    
    // Finding
    const relDocs = await searchRepository.getList({ keywords: {
        $elemMatch: {
            word: {
                $in: wordsToSearch
            }
        }
    }});

    // Sorting
    for (const doc of relDocs) {
        const { score, totalWordsMatch, totalWordsRelated } = doc.computeRelevanceScore(wordsToSearch);
        rankingSearch.push({ 
            question: (await doc.populate('questionId')).questionId as unknown as QuestionDocument,
            score,
            totalWordsMatch,
            totalWordsRelated
        });
    }

    const pageIndex = (page - 1) * amount;
    const endIndex = pageIndex + amount;
    
    rankingSearch.sort(compareSearchRow)
    return rankingSearch.slice(pageIndex, endIndex);
}

const compareSearchRow = (a: SearchRow , b: SearchRow): number => {
    if (a.totalWordsMatch > b.totalWordsMatch) {
        return -1;
    } else 
    if (a.totalWordsMatch === b.totalWordsMatch && a.totalWordsRelated > b.totalWordsRelated) {
        return -1;
    } else
    if (a.totalWordsRelated === b.totalWordsRelated && a.score > b.score) {
        return -1;
    } else return 1;
}
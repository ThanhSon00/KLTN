import { Question } from "../models/mongodb/documents";
import { searchRepository } from "../repositories";

export const fullTextSearch = async ({ text, amount, page }: { text: string, amount: number, page: number }) => {
    const rankingSearch = [];
    const words = await Question.getMeaningfulWords(text);
    const wordsToSearch = words.map(item => item.word);
    const relDocs = await searchRepository.getList({ keywords: {
        $elemMatch: {
            word: {
                $in: wordsToSearch
            }
        }
    }});

    for (const doc of relDocs) {
        rankingSearch.push({ 
            score: doc.computeRelevanceScore(wordsToSearch), 
            question: (await doc.populate('questionId')).questionId
        });
    }

    const pageIndex = (page - 1) * amount;
    const endIndex = pageIndex + amount;
    
    rankingSearch.sort((a, b) => b.score - a.score)
    return rankingSearch.slice(pageIndex, endIndex);
}
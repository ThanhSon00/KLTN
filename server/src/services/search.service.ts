import { Question } from "../models/mongodb/documents";
import { questionRepository, searchRepository } from "../repositories"

const init = async () => {
    const questions = await questionRepository.getList({});
    let i = 0;
    for (const question of questions) {
        if (i % 100 === 0) console.log(i);
        await searchRepository.create({ 
            questionId: question.id, 
            paragraph: question.toParagraph(), 
            keywords: await question.getKeywords()
        })
        i++;
    }
}

const refresh = async () => {
    const searches = await searchRepository.getList({});
    const mapOfWordOcurrences = new Map<string, number>();
    let i = 0;
    for (const search of searches) {
        console.log(i);
        await searchRepository.update({ id: search.id }, {
            keywords: await search.refreshKeywordRanking(searches.length, 200, mapOfWordOcurrences)
        })
        i++;
    }
}

export default {
    init,
    refresh
}


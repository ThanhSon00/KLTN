import { questionRepository, searchRepository } from "../repositories"

const init = async () => {
    const questions = await questionRepository.getList({});
    for (const question of questions) {
        await searchRepository.create({ 
            questionId: question.id, 
            paragraph: question.toParagraph(), 
            keywords: await question.getKeywords()
        })
    }
}

const refresh = async () => {
    const searches = await searchRepository.getList({});
    for (const search of searches) {
        await searchRepository.update({ id: search.id }, {
            keywords: await search.refreshKeywordRanking(searches.length)
        })
    }
}


export default {
    init,
    refresh
}


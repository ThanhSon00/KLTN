import { faker } from "@faker-js/faker";
import { VoteInput, VoteType } from "../../src/models/mongodb/documents/vote.model";
import { userOne } from "./user.fixture";
import { questionOne } from "./question.fixture";
import { voteRepository } from "../../src/repositories";

export const voteOne: VoteInput = {
    id: faker.database.mongodbObjectId().toString(),
    type: VoteType.upvote,
    questionId: questionOne.id as string,
    voter: userOne.id as string,
}

export const matchVoteOne = {
    id: voteOne.id,
    type: voteOne.type,
    questionId: voteOne.questionId,
}

export const insertVote = async (vote: VoteInput) => {
    return await voteRepository.createVote(vote);
}
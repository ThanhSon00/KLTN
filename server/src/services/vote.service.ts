import { voteRepository } from "../repositories";
import { Vote, VoteInput } from "../models/mongodb/documents/vote.model";
import ApiError from "../utils/ApiError";

export const createVote = async (voteBody: VoteInput) => {
    if (await Vote.checkIfVoteExists(voteBody)) throw new ApiError(400, "Vote already exists");
    const vote = await voteRepository.createVote(voteBody);
    return vote;
}
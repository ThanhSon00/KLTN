import { User } from "app/components/SignInPanel/slice/types";
import { Answer, AnswerDetails } from "services/answer.service";
import { Vote } from "services/vote.service";

/* --- STATE --- */
export interface Question {
  id: string;
  title: string;
  details: string;
  author: User;
  views: number;
  answers: Array<Answer>;
  createdAt: string;
  updatedAt: string;
  votes: number;
  voteStatus?: Vote;
  answered: boolean;
}

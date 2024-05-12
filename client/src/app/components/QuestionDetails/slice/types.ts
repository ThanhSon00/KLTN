import { User } from "app/components/SignInPanel/slice/types";
import { Answer, AnswerDetails } from "services/answer.service";

/* --- STATE --- */
export interface Question {
  id: string;
  title: string;
  details: string;
  author: User;
  views: number;
  comments: Array<AnswerDetails>;
  createdAt: string;
  updatedAt: string;
}

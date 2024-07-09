import { answerRepository, questionRepository, reportRepository, userRepository } from "../repositories";
import { IReport, ReportInput, ReportStatus, ReportType } from "../models/mongodb/documents/report.model";
import { notificationService } from "../services";
import ApiError from "../utils/ApiError";
import { removeHtmlTags } from "../utils/removeHtmlTags";

const contentIdMap = {
    question: 'questionId',
    answer: 'answerId',
    user: 'userId',
}
  
export const getReports = (filterOptions: Partial<ReportInput>, queryOptions: { limit: number, page: number, sortDesc: string }) => {
    return reportRepository.getList(filterOptions, { 
        limit: queryOptions.limit, 
        skip: (queryOptions.page - 1) * queryOptions.limit,
        sort: { [queryOptions.sortDesc]: -1 }
    });
}

const generateTitle = async (type: ReportType, id: string) => {
    let highlightLink = '', title = '';
    if (type === ReportType.question) {
        const question = await questionRepository.getById(id);
        title = question?.title as string;
        highlightLink = `/home/questions/${id}/highlight`;
    }
    else if (type === ReportType.answer) {
        const answer = await answerRepository.getById(id);
        title = removeHtmlTags(answer?.details.content as string);
        highlightLink = `/home/questions/${answer?.questionId}/answers/${id}/highlight`;
    }
    else if (type === ReportType.user) {
        const user = await userRepository.getById(id);
        title = user.name;
        highlightLink = `/home/profile/${id}`;
    }
    return { title, highlightLink }
}

export const createReport = async (reportBody: ReportInput) => {
    const { type } = reportBody;
    //@ts-expect-error
    const { title, highlightLink } = await generateTitle(reportBody.type, reportBody[contentIdMap[type]]);
    const report = await reportRepository.create({ ...reportBody, title, highlightLink });
    return report;
}

export const updateReport = async (id: string, reportBody: Partial<IReport>) => {
    const { status, response } = reportBody;
    const report = await reportRepository.update(id, { status, response });

    if (!report) throw new ApiError(404, "Report not found");
    await notificationService.notifyUserReport(report);
    return report;
}
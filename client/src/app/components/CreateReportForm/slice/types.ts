import { ReportedType } from "services/report.service";

/* --- STATE --- */
export interface ReportState {
    reportedContentId: string;
    reportedType: ReportedType;
}

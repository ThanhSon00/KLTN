import { Report, ReportedType, ReportStatus } from "services/report.service";

/* --- STATE --- */
export interface SolutionStatus {
  currentReport?: Report,
  statusToUpdate?: ReportStatus,
  updateReportState?: Function,
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Report, ReportStatus } from "services/report.service"
import { isoToDateTimeString } from "utils/date";
import { panelActions } from "../SignUpPanel/slice";
import { panelName } from "../SignUpPanel/slice/types";
import { useAppDispatch } from "store/hooks";
import { SolutionActions } from "../AdminReport/slice";
import parse from "html-react-parser";
import { removeHtmlTags } from "utils/removeHtmlTags";

interface Props {
    report: Report;
}

export enum Avatar {
    anonymous = "/images/anonymous-avatar.png"
}

export default function ReportLine(props: Props) {
    const [report, setReport] = useState<Report>(props.report);   
    const dispatch = useAppDispatch();
    const openNewTab = (e) => {
        e.preventDefault();
        window.open(`${process.env.PUBLIC_URL}/#${report.highlightLink}`, '_blank');
    }

    const handleClick = async (reportStatus: ReportStatus) => {
        if (report.status !== ReportStatus.pending) return;
        dispatch(SolutionActions.setSolutionStatus({ 
            statusToUpdate: reportStatus,
            currentReport: report,
            updateReportState: setReport,
        }))
        dispatch(panelActions.openPanel(panelName.SOLUTION));
    }

    return (
        <tr className="table-row">
            <td className="patient-img sorting_1">
            <img
                src={report.reporter.avatar 
                    ? !report.reporter.avatar.startsWith('https') 
                        ? `${process.env.REACT_APP_SERVER_ORIGIN}${report.reporter.avatar}` 
                        : report.reporter.avatar
                    : Avatar.anonymous}
            />
            </td>
            <td>
                {report.reporter.name}</td>
            <td>{isoToDateTimeString(report.createdAt)}</td>
            <td>
                {report.status === ReportStatus.pending && 
                    <span className="label label-warning">
                        Đang chờ xử lý
                    </span>
                }
                {report.status === ReportStatus.rejected && 
                    <span className="label label-danger">
                        Đã từ chối
                    </span>
                }
                {report.status === ReportStatus.approved &&
                    <span className="label label-success">
                        Đã xử lý
                    </span>
                } 
            </td>
            <td>{report.details}</td>
            <td>
                <Link 
                    to={report.highlightLink} 
                    onClick={(e) => openNewTab(e)}
                    style={{ overflow: 'hidden', display: '-webkit-box', 'WebkitLineClamp': 1, WebkitBoxOrient: 'vertical' }}>
                        {parse(report.title)}
                </Link>
            </td>
            <td>
                <a className="tblEditBtn" onClick={(e) => { handleClick(ReportStatus.approved) }}>
                    <i className={"fa fa-check-circle-o" + (report.status !== ReportStatus.pending ? " fa-disabled" : "") } />
                </a>
                <a className="tblDelBtn" onClick={(e) => { handleClick(ReportStatus.rejected) }}>
                    <i className={"fa fa-cancel" + (report.status !== ReportStatus.pending ? " fa-disabled" : "")} />
                </a>
            </td>
        </tr>
    )
}
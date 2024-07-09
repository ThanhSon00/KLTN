import { useEffect, useState } from "react"
import { getReports, Report, ReportedType } from "services/report.service"
import ReportLine from "../ReportLine"
import { useAppSelector } from "store/hooks";
import { selectSolution } from "../AdminReport/slice/selectors";

interface Props {
    reportedType: ReportedType;
}

export default function ReportTable(props: Props) {
    const [reports, setReports] = useState<Report[]>([])
    const [page, setPage] = useState(1)
    const { currentReport } = useAppSelector(selectSolution);
    const loadData = async ({ page, type }: { page: number, type: ReportedType}) => {
        const result = await getReports({ limit: 5, page, type, sortDesc: 'createdAt'});
        setReports(result);
    }

    const loadMore = async () => {
        const result = await getReports({ limit: 5, page: page + 1, type: props.reportedType, sortDesc: 'createdAt' });
        setPage(page + 1);
        setReports([...reports,...result]);
    }

    useEffect(() => {
        loadData({ page: 1, type: props.reportedType});
        setPage(1);
    }, [props.reportedType]);
    return (
        <>
            <div
                className="mdl-tabs__panel is-active p-t-20"
                id="tab4-panel"
                >
                <div className="table-responsive">
                    <table className="table">
                    <tbody>
                        <tr>
                            <th className="table-head head-one">Người dùng</th>
                            <th className="table-head head-two">Tên tài khoản</th>
                            <th className="table-head head-three">Thời gian</th>
                            <th className="table-head head-four">Tình trạng</th>
                            <th className="table-head head-five">Nội dung</th>
                            <th className="table-head head-six">Đối tượng</th>
                            <th className="table-head head-seven">Hành động</th>
                        </tr>
                        {reports.map(report => 
                            <ReportLine report={report} key={report.id} />
                            )
                        }
                    </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <button className="btn btn-outline-primary btn-round btn-sm" onClick={loadMore}>
                        Hiển thị thêm
                    </button>
                </div>
            </div>
        </>
    )
}
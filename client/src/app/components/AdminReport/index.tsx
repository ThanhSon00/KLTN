
import ReportTable from "app/components/ReportTable";
import { useState } from "react";
import { ReportedType } from "services/report.service";
import SolutionForm from "../SolutionForm";
import { Link } from "react-router-dom";
export default function AdminReport() {
    const [reportType, setReportType] = useState<ReportedType>(ReportedType.question);
    const isActiveTab = (type: ReportedType) => {
        if (type === reportType) {
            return ' is-active';
        }
        return '';
    }

    const changeTab = (e, type: ReportedType) => {
        e.preventDefault();
        setReportType(type);
    }
    return (
        <div className="page-content" style={{ minHeight: "567px" }}>
            <div className="page-bar">
                <div className="page-title-breadcrumb">
                    <div className=" pull-left">
                    <div className="page-title">Quản lý báo cáo</div>
                    </div>
                    <ol className="breadcrumb page-breadcrumb pull-right">
                    <li>
                        <i className="fa fa-home" />
                        &nbsp;
                        <Link to="/admin/dashboard" className="parent-item">Trang chủ</Link>
                        &nbsp;
                        <i className="fa fa-angle-right" />
                    </li>
                    <li className="active">Quản lý báo cáo</li>
                    </ol>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-box">
                    <div className="card-head">
                        <header>Quản lý khiếu nại từ người dùng</header>
                    </div>
                    <div className="card-body ">
                        <div
                        className="mdl-tabs mdl-js-tabs is-upgraded"
                        data-upgraded=",MaterialTabs"
                        >
                        <div className="mdl-tabs__tab-bar tab-left-side">
                            <a
                            href="#"
                            className={"mdl-tabs__tab tabs_three" + isActiveTab(ReportedType.question)}
                            onClick={(e) => changeTab(e, ReportedType.question)}
                            >
                                Bài đăng
                            </a>
                            <a
                            href="#"
                            className={"mdl-tabs__tab tabs_three" + isActiveTab(ReportedType.answer)}
                            onClick={(e) => changeTab(e, ReportedType.answer)}
                            >
                                Bình luận
                            </a>
                            <a
                            href="#"
                            className={"mdl-tabs__tab tabs_three" + isActiveTab(ReportedType.user)}
                            onClick={(e) => changeTab(e, ReportedType.user)}
                            >
                                Người dùng
                            </a>
                        </div>
                        <ReportTable reportedType={reportType} />
                        <div className="mdl-tabs__panel p-t-20" id="tab5-panel">
                            <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Ammount</th>
                                    <th>Transaction ID</th>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user1.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Eugine Turner</td>
                                    <td>04-01-2017</td>
                                    <td>
                                    <span className="label label-success">
                                        Paid
                                    </span>
                                    </td>
                                    <td>700$</td>
                                    <td>#7234417</td>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user4.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Jacqueline Howell</td>
                                    <td>03-01-2017</td>
                                    <td>
                                    <span className="label label-warning">
                                        Pending
                                    </span>
                                    </td>
                                    <td>500$</td>
                                    <td>#7234454</td>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user5.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Jayesh Parmar</td>
                                    <td>03-01-2017</td>
                                    <td>
                                    <span className="label label-danger">
                                        Unpaid
                                    </span>
                                    </td>
                                    <td>400$</td>
                                    <td>#72544</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className="text-center">
                            <button className="btn btn-outline-primary btn-round btn-sm">
                                Load More
                            </button>
                            </div>
                        </div>
                        <div className="mdl-tabs__panel p-t-20" id="tab6-panel">
                            <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th>Người dùng</th>
                                    <th>Tên</th>
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Ammount</th>
                                    <th>Transaction ID</th>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user8.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Jane Elliott</td>
                                    <td>06-01-2017</td>
                                    <td>
                                    <span className="label label-primary">
                                        Paid
                                    </span>
                                    </td>
                                    <td>300$</td>
                                    <td>#7234421</td>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user7.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Jacqueline Howell</td>
                                    <td>03-01-2017</td>
                                    <td>
                                    <span className="label label-warning">
                                        Pending
                                    </span>
                                    </td>
                                    <td>450$</td>
                                    <td>#723344</td>
                                </tr>
                                <tr>
                                    <td className="patient-img sorting_1">
                                    <img
                                        src="./images/user9.jpg"
                                        alt=""
                                    />
                                    </td>
                                    <td>Jacqueline Howell</td>
                                    <td>03-01-2017</td>
                                    <td>
                                    <span className="label label-primary">
                                        Paid
                                    </span>
                                    </td>
                                    <td>550$</td>
                                    <td>#7235454</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className="text-center">
                            <button className="btn btn-outline-primary btn-round btn-sm">
                                Load More
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <SolutionForm />
        </div>
    )
}
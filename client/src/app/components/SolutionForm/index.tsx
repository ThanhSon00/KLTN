import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectPanelState } from "../SignUpPanel/slice/selectors"
import { panelName } from "../SignUpPanel/slice/types";
import { panelActions } from "../SignUpPanel/slice";
import { ReportStatus, updateReportStatus } from "services/report.service";
import { selectSolution } from "../AdminReport/slice/selectors";
import { SolutionActions } from "../AdminReport/slice";
import { useState } from "react";

export default function SolutionForm() {
  const { currentReport, statusToUpdate } = useAppSelector(selectSolution);
  const [response, setResponse] = useState("");
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentReport || !statusToUpdate) throw new Error("currentReport or status is undefined");

    await dispatch(updateReportStatus({ id: currentReport.id, status: statusToUpdate, response }))
  }

  const handleCloseForm = async (e) => {
    e.preventDefault();
    dispatch(SolutionActions.clearSolutionStatus());
    dispatch(panelActions.closePanel());
  }

  const handleChange = (e) => {
    setResponse(e.target.value);
  }

  return (
    <div
    className={"modal fade" + " " + (popUp === panelName.SOLUTION ? "show" : "")}
    id="exampleModal1"
    tabIndex={-1}
    role="dialog"
    aria-modal="true"
    style={popUp === panelName.SOLUTION ? { display: "block" } : { display: "none" }}
    >
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5
            className="modal-title"
            id="addEventTitle"
            style={{ display: "block" }}
            >
            {statusToUpdate === ReportStatus.approved && "Gửi thông báo đã xử lý báo cáo"}
            {statusToUpdate === ReportStatus.rejected && "Gửi thông báo giải thích lý do từ chối"}
            </h5>
            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseForm}
            />
        </div>
        <div className="modal-body">
            <form className="" onSubmit={handleSubmit}>
                <input type="hidden" id="id" name="id" />
                <div className="row">
                    <div className="col-md-12">
                    <div className="form-group">
                        <label style={{ marginBottom: '7px' }}>Nội dung</label>
                        <textarea
                        id="eventDetails"
                        name="eventDetails"
                        placeholder="Viết nội dung ở đây (tối đa 200 ký tự)"
                        className="form-control"
                        onChange={handleChange}
                        maxLength={200}
                        />
                    </div>
                    </div>
                </div>
                <div className="modal-footer bg-whitesmoke pr-0">
                    <button
                    type="submit"
                    className="btn btn-round btn-primary"
                    id="add-event"
                    style={{ display: "block" }}
                    >
                    Gửi
                    </button>
                    <button
                    type="button"
                    id="close"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleCloseForm}
                    >
                    Hủy
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
    </div>
  )
}
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectPanelState } from "../SignUpPanel/slice/selectors";
import { useEffect, useState } from "react";
import { panelName } from "../SignUpPanel/slice/types";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { createReport, ReportedType } from "services/report.service";
import { getAuth } from "../SignInPanel/slice/selectors";
import { selectReportState } from 'app/components/CreateReportForm/slice/selectors';
import { ReportActions } from "./slice";
import { panelActions } from "../SignUpPanel/slice";

interface Props {}


const contentIdMap = {
    [ReportedType.question]: 'questionId',
    [ReportedType.answer]: 'answerId',
    [ReportedType.user]: 'userId',
}
export default function CreateReportForm(props: Props) {
    const { user } = useAppSelector(getAuth);
    const { reportedContentId, reportedType } = useAppSelector(selectReportState);
    const { popUp } = useAppSelector(selectPanelState);
    const [details, setDetails] = useState('');
    const dispatch = useAppDispatch();
    const resetState = () => {
        setDetails('');
        dispatch(ReportActions.clearReportState());
    }

    const handleDetailsChange = (e) => {
        setDetails(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        const result = await dispatch(createReport({ 
            details, 
            reporter: user.id, 
            [contentIdMap[reportedType]]: reportedContentId, 
            type: reportedType,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(panelActions.closePanel())
        }
    }

    useEffect(() => {
        if (popUp !== panelName.CREATE_REPORT) {
            resetState();
        }
    }, [popUp])

    return (
        <div
            className="panel-pop panel-pop-not-login"
            id="wpqa-report"
            style={{ 
                position: "sticky", 
                top: "300px", 
                left: "39%", 
                display: popUp === panelName.CREATE_REPORT ? "block" : "none",
            }}
        >        
        <i className="icon-cancel" onClick={() => { dispatch(panelActions.closePanel()) }}/>
        <div className="panel-pop-content">    
            <p className="question_report">
                Vui lòng giải thích ngắn gọn tại sao bạn cảm thấy câu hỏi này nên được báo cáo.
            </p>
            <form className="wpqa_form submit-report" method="post" onSubmit={handleSubmit}>
                <div className="wpqa_error" /> <div className="wpqa_success" />
                <div className="form-inputs clearfix">
                    <p className="login-text">
                    <label htmlFor="explain-reported">
                        Giải thích<span className="required">*</span>
                    </label>
                    <textarea
                        cols={58}
                        rows={8}
                        className="form-control"
                        id="explain-reported"
                        name="explain"
                        defaultValue={details}
                        onChange={handleDetailsChange}
                        placeholder="Nội dung tối đa 200 ký tự"
                        maxLength={200}
                        required
                    />
                    <i className="icon-pencil" />
                    </p>
                </div>
                <PanelSubmitButton name="Gửi báo cáo"/>
            </form>
        </div>
        </div>

    )
}
import { User } from '../SignInPanel/slice/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { ReportActions } from '../CreateReportForm/slice';
import { ReportedType } from 'services/report.service';
import { AlertActions } from '../AuthMessage/slice';

interface Props {
  author: User;
}

export function QuestionBottom(props: Props) {
  const { user } = useAppSelector(getAuth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const editQuestionClick = (e) => {
    e.preventDefault();
    navigate(`/home/edit-question/${id}`);
  }

  const handleOpenReportForm = (e) => {
    e.preventDefault();
    if (!id) return;
    if (user) {
      dispatch(ReportActions.setReportState({ reportedContentId: id, reportedType: ReportedType.question }));
      dispatch(panelActions.openPanel(panelName.CREATE_REPORT));
    } else {
      dispatch(
        AlertActions.setAuthMessage({
          error: 'Bạn vui lòng đăng nhập để tiếp tục để viết báo cáo',
        }),
      );
      dispatch(panelActions.openPanel(panelName.SIGN_IN));
    }
  }

  return (
    <div className="question-bottom">
      <div className="post-share">
      </div>
      <ul className="question-link-list">
        {(user && user.id === props.author.id) ? 
          <li>
            <a
              className="dropdown-item"
              href="/"
              onClick={editQuestionClick}
            >
              <i className="icon-pencil" />
              Chỉnh sửa
            </a>
          </li>: 
          <li className="report_activated" >
            <a className="dropdown-item report_q" onClick={handleOpenReportForm} href="/">
              <i className="icon-attention" />
              Báo cáo
            </a>
          </li>
        }
      </ul>
      <div className="clearfix" />
    </div>
  );
}

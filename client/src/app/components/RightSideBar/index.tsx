import { useAppDispatch, useAppSelector } from "store/hooks";
import RightSideTabs from "../RightSideTabs";
import TopActive from "../TopActive";
import UserStatics from "../UserStatics";
import { getAuth } from "../SignInPanel/slice/selectors";
import { panelActions } from "../SignUpPanel/slice";
import { panelName } from "../SignUpPanel/slice/types";
import { AlertActions } from "../AuthMessage/slice";

export default function RightSideBar() {
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();
    
    const handleAskQuestionClick = e => {
        e.preventDefault();
        if (user) {
          dispatch(panelActions.openPanel(panelName.ASK_QUESTION));
        } else {
          dispatch(
            AlertActions.setAuthMessage({
              error: 'Bạn vui lòng đăng nhập để tiếp tục được đặt câu hỏi',
            }),
          );
          dispatch(panelActions.openPanel(panelName.SIGN_IN));
        }
    };

    return (
        <div className="inner-sidebar">
            <div className="widget card widget_ask">
            <a
                target="_self"
                href="/"
                className="button-default btn btn__primary btn__block btn__semi__height wpqa-question"
                onClick={handleAskQuestionClick}
            >
                Đặt câu hỏi
            </a>
            </div>
            {user && <UserStatics />}
            <RightSideTabs />
            {/* <RelatedQuestion /> */}
            <TopActive />
        </div>
    )
}
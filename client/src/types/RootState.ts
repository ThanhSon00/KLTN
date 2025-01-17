import { ThemeState } from 'styles/theme/slice/types';
import AuthState from 'app/components/SignInPanel/slice/types';
import { PanelState } from 'app/components/SignUpPanel/slice/types';
import { AlertState } from 'app/components/AlertMessage/slice/types';
import { AuthMessageState } from 'app/components/AuthMessage/slice/types';
import { LoadingIndicatorState } from 'app/components/PanelSubmitButton/slice/types';
import { Question } from 'app/components/QuestionDetails/slice/types';
import { ReportState } from 'app/components/CreateReportForm/slice/types';
import { AdminState } from 'app/components/AdminLogin/slice/types';
import { SolutionStatus } from 'app/components/AdminReport/slice/types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  authState?: AuthState;
  panelState?: PanelState;
  alertState?: AlertState;
  authMessageState?: AuthMessageState;
  loadingIndicatorState?: LoadingIndicatorState;
  questions?: Question[];
  reportState?: ReportState;
  adminState?: AdminState;
  solutionState?: SolutionStatus;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

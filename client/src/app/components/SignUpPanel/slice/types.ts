/* --- STATE --- */
export interface PanelState {
  popUp?: panelName;
}

export enum panelName {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  LOST_PASSWORD = 'LOST_PASSWORD',
  ASK_QUESTION = 'ASK_QUESTION',
  CREATE_REPORT = 'CREATE_REPORT',
  SOLUTION = 'SOLUTION',
  NONE = 'NONE',
}

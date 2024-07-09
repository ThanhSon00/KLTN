/* eslint-disable react/no-unescaped-entities */
/**
 *
 * CallAction
 *
 */

import React, { memo } from 'react';
import { panelActions } from '../SignUpPanel/slice';
import { panelName } from '../SignUpPanel/slice/types';
import { useAppDispatch } from 'store/hooks';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CallAction() {
  const dispatch = useAppDispatch();
  const handleCreateNewAccount = (e) => {
    e.preventDefault();
    dispatch(panelActions.openPanel(panelName.SIGN_UP));
  }
  return (
    <div className="call-action-unlogged call-action-dark call-action-style_1">
      <div className="call-action-opacity" />
      <div className="the-main-container">
        <div className="call-action-wrap">
          <div className="col6">
            <h3>Chia sẻ và phát triển thế giới tri thức</h3>
            <p>
            Chúng tôi muốn kết nối những người có kiến thức với những người cần nó, để đưa những người có quan điểm khác nhau lại gần nhau hơn và trao quyền cho mọi người để chia sẻ kiến thức của họ. 
            </p>
          </div>
          <div className="col3">
            <a
              target="_self"
              className="signup-panel button-default call-action-button"
              href="/"
              onClick={handleCreateNewAccount}
            >
              Tạo tài khoản mới
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

CallAction.propTypes = {};

export default memo(CallAction);

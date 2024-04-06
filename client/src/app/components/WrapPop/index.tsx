/**
 *
 * WrapPop
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectPanelState } from '../SignUpPanel/slice/selectors';
import { panelName } from '../SignUpPanel/slice/types';
import { panelActions } from '../SignUpPanel/slice';
// import styled from 'styled-components';

function WrapPop() {
  const { popUp } = useAppSelector(selectPanelState);
  const dispatch = useAppDispatch();
  const handleClick = e => {
    dispatch(panelActions.closePanel());
  };

  return (
    <div className="put-wrap-pop">
      {popUp !== panelName.NONE && (
        <div className="wrap-pop" onClick={handleClick} />
      )}
    </div>
  );
}

WrapPop.propTypes = {
  isPop: PropTypes.bool,
};

export default WrapPop;

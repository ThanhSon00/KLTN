/* eslint-disable react/no-unescaped-entities */
/**
 *
 * CallAction
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CallAction() {
  return (
    <div className="call-action-unlogged call-action-dark call-action-style_1">
      <div className="call-action-opacity" />
      <div className="the-main-container">
        <div className="call-action-wrap">
          <div className="col6">
            <h3>Share &amp; grow the world's knowledge!</h3>
            <p>
              We want to connect the people who have knowledge to the people who
              need it, to bring together people with different perspectives so
              they can understand each other better, and to empower everyone to
              share their knowledge.
            </p>
          </div>
          <div className="col3">
            <a
              target="_self"
              className="signup-panel button-default call-action-button"
              href="signup/index.html"
            >
              Create A New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

CallAction.propTypes = {};

export default memo(CallAction);

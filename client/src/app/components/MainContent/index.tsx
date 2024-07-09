import React, { memo, useEffect, useRef, useState } from 'react';
import DisplayContent from '../DisplayContent';
import { Outlet } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function MainContent() {

  return (
    <div
      className="main-content"
      style={{ minHeight: 'calc(-487.571px + 100vh)' }}
    >
      <Outlet />
    </div>
  );
}

MainContent.propTypes = {};

export default memo(MainContent);

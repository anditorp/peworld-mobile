// IconHome.js
import React from 'react';
import Svg, {Path} from 'react-native-svg';

function IconHome(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 3H3V10H10V3Z"
        stroke="#9EA0A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 3H14V10H21V3Z"
        stroke="#9EA0A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 14H14V21H21V14Z"
        stroke="#9EA0A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 14H3V21H10V14Z"
        stroke="#9EA0A5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconHome;

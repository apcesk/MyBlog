import React from "react";
import  * as Icon from '@ant-design/icons';

export default function App(props) {
  return (
    <span > 
    {
      React.createElement(
        Icon[props.iconType],
        {
          style:{ fontSize: '16px', color: '#08c' }
        }
      )
    }
    </span>
  );
}
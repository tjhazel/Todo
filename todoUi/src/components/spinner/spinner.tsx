import * as React from 'react';
import './spinner.css'; 
import reactLogo from '../../assets/react.svg';

interface SpinnerProps {
   size?: string;
   color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = '40px', color = '#333' }) => {
   const spinnerStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderTopColor: 'transparent', 
   };

   return (<div>
      <img src={reactLogo} className="logo react" style={spinnerStyle} alt="React logo" />
      </div>);
};

export default Spinner;
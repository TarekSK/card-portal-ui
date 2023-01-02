import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheck, FiInfo } from 'react-icons/fi';

interface AlertProps {
  type: string;
  isShow: boolean;
  setIsShow?: (isShowAlertRNP: boolean) => void;
  title: string;
  text: string;
}

const Alert = ({ type, isShow, setIsShow, title, text }: AlertProps) => {
  // State - Type
  const [alertType, setAlertType] = useState<string>(type);
  // State - IsShow
  const [isShowAlert, setIsShowAlert] = useState<boolean>(isShow);

  // Alert Type Color
  const alertTypeColor = () => {
    switch (alertType) {
      case 'success':
        return 'green';
      case 'danger':
        return 'red';
      case 'info':
        return 'blue';
    }
  };

  // Alert Type Icon
  const alertTypeIcon = () => {
    switch (alertType) {
      case 'success':
        return <FiCheck color={alertTypeColor()} />;
      case 'danger':
        return <FiAlertTriangle color={alertTypeColor()} />;
      case 'info':
        return <FiInfo color={alertTypeColor()} />;
    }
  };

  useEffect(() => {
    // State - Set As Prop
    setIsShowAlert(isShow);

    if (isShow) {
      // Alert - Hide
      alertHide();
    }
  }, [isShow]);

  // Alert Type - With Change
  useEffect(() => {
    // Alert - Set
    alertSet();
  }, [type]);

  // Alert - Set
  const alertSet = () => {
    // Alert Type - Set
    setAlertType(type);

    // Alert Type Icon
    alertTypeIcon();
  };

  // Alert - Hide
  const alertHide = () => {
    // Alert - Hide - After 5 Seconds
    setTimeout(() => {
      // Hide Alert
      setIsShowAlert(false);
      setIsShow!(false);
    }, 5000000);
  };

  return (
    <>
      {isShowAlert && (
        <div
          className={`p-4 mt-7 mb-4 text-sm rounded-lg text-${alertTypeColor()}-700 bg-${alertTypeColor()}-100`}
          role="alert"
        >
          <div className="text-2xl px-1 pb-2">{alertTypeIcon()}</div>
          <div className="font-semibold p-1">{title}</div>
          <div className="font-normal p-1">{text}</div>
        </div>
      )}
    </>
  );
};

export default Alert;

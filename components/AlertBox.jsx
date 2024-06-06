// src/AlertBox.js
import React, { useEffect, useState } from 'react';

const AlertBox = ({ id, message, onClose, index }) => {
  const [visible, setVisible] = useState(false);
  const spacing = 70; // Adjust this value for desired spacing

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose(id);
      }, 500); // Allow time for exit animation
    }, 5000); // Duration before auto-dismiss

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      className={`absolute right-4 transition-transform duration-1000 ease-in-out ${
        visible ? 'translate-x-0' : 'translate-x-full'
      } mb-4`}
      style={{ bottom: `${spacing * index}px` }} // Adjust spacing between alerts
    >
      <div className="bg-slate-800 bg-opacity-70 backdrop-blur-lg p-4 rounded shadow-lg">
        <div className="flex items-center h-full w-fit justify-between">
          <span className="text-slate-400">{message}</span>
          <button
            onClick={() => onClose(id)}
            className="text-gray-500 text-2xl h-full flex items-center hover:text-gray-800"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;

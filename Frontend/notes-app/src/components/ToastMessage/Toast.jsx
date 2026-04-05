import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {

  // Auto close after 3 seconds
  useEffect(() => {
    if (isShown) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isShown, onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-300 ${
        isShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
      }`}
    >
      <div
        className={`min-w-[250px] bg-white border shadow-2xl rounded-md relative`}
      >
        {/* Left colored border */}
        <div
          className={`absolute left-0 top-0 h-full w-[5px] rounded-l-md ${
            type === "delete" ? "bg-red-500" : "bg-green-500"
          }`}
        />

        <div className="flex items-center gap-3 py-3 px-4">
          
          {/* Icon container */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "delete" ? "bg-red-100" : "bg-green-100"
            }`}
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          {/* Message */}
          <p className="text-sm text-slate-800">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
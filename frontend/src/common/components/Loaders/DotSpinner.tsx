import React from "react";
import { ThreeDots } from "react-loader-spinner";

const DotSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="30"
        width="50"
        color="#0f172a"
        radius="9"
      />
    </div>
  );
};

export default DotSpinner;

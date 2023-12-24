import { NextPage } from "next";
import { ReactElement } from "react";

const PermissionDenied: NextPage = (): ReactElement => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h1 className="text-7xl font-bold text-gray-700">403 Permission Denied</h1>
    </div>
  );
};

export default PermissionDenied;

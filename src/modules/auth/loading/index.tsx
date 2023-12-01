import { FC, ReactElement } from "react";

const SkeletonLoader: FC<{ className?: string }> = ({ className }): ReactElement => {
  return <div className={`animate-pulse bg-gray-300 ${className}`}></div>;
};

export const FormSkeleton: FC = (): ReactElement => {
  return (
    <form className="md:w-1/2 w-full border h-full gap-y-4 justify-center flex flex-col md:px-12 px-6 rounded-lg">
      <div className="flex flex-col gap-y-2 mb-10">
        <SkeletonLoader className="h-12 w-3/4 bg-blue-200" />
        <SkeletonLoader className="h-4 w-1/2 bg-gray-200" />
      </div>
      <SkeletonLoader className="h-10 w-full bg-gray-200 mb-2" />
      <SkeletonLoader className="h-10 w-full bg-gray-200 mb-2" />
      <SkeletonLoader className="h-10 w-full bg-gray-200 mb-2" />
      <SkeletonLoader className="h-5 w-1/4 bg-gray-200 mb-2" />
      <SkeletonLoader className="h-10 w-full bg-blue-200" />
      <div className="w-full flex justify-between mt-2">
        <SkeletonLoader className="h-4 w-1/2 bg-gray-200" />
      </div>
    </form>
  );
};

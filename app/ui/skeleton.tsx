export function ModalSkeleton() {
  return (
    <div className="animate-pulse p-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-72 h-96 bg-gray-700 rounded"></div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          <div className="h-6 bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-700 rounded w-full"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-md w-[500px] h-[750px]"></div>
      <div className="mt-2 h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
    </div>
  );
}

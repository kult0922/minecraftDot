export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-gray-300 h-2">
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-m-green-light"
      />
    </div>
  );
};

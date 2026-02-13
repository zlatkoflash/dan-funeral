"use client";

const VerifiedBadge = ({ text, addQuestion = true }: { text?: string, addQuestion?: boolean }) => {
  return (
    <div className="relative inline-block">
      {/* Main Badge Container */}
      <div className="flex items-center gap-2 bg-[#6b7c67] text-white px-3 py-2 pr-4 rounded-full shadow-md">

        {/* The Seal Icon */}
        <div className="relative flex items-center justify-center w-9 h-9 flex-shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White Circle Base */}
            <circle cx="50" cy="50" r="45" fill="white" />

            {/* Centered Green Checkmark */}
            <path
              d="M32 52 L44 64 L68 36"
              fill="none"
              stroke="#6b7c67"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <span className="text-base font-semibold tracking-wide">
          {text || "Verified"}
        </span>
      </div>

      {/* Info Icon with Tooltip */}
      {addQuestion && (
        <div className="group absolute -top-2 -right-2">
          <div className="bg-[#a1a1a1] text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-help transition-all group-hover:bg-[#6b7c67] group-hover:scale-110">
            <span className="text-sm font-bold">?</span>
          </div>

          <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block w-72 p-4 bg-[#6b7c67] text-white text-sm rounded-xl shadow-2xl z-50">
            <p className="leading-relaxed font-medium text-light">
              Verified by our team and cleared through our comprehensive initial checks, giving you the peace of mind you deserve.
            </p>
            <div className="absolute top-full right-3 border-8 border-transparent border-t-[#6b7c67]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedBadge;
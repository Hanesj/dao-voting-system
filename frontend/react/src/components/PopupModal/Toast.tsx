interface ToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ isOpen, message, onClose, duration = 5000 }: ToastProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-5 right-5 z-[100] animate-fade-in-down">
      <div className="bg-white/80 backdrop-blur-md border border-white/20 border-l-4 border-green-500 shadow-lg rounded-md p-4 flex items-center gap-4 min-w-[300px]">
        {/* Ikon */}
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="C9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">{message}</p>
        </div>

        {/* Stäng-knapp */}
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">&times;</span>
        </button>
      </div>
      <div className="h-1.5 w-full bg-gray-100/50">
        <div
          className="h-full rounded-r-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
          style={{
            background: "linear-gradient(90deg, #4ade80 0%, #2276c5ff 100%)",
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      {/* Uppdaterad CSS för mjukare animation */}
      <style>{`
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`}</style>
    </div>
  );
};

export default Toast;

interface PlusButtonProps {
  onClick: () => void;
  size: string;
  className?: string;
  ariaLabel?: string;
}

interface CloseProps {
  onClick: () => void;
  size: string;
  className?: string;
  ariaLabel?: string;
}

export const PlusButton = ({ onClick, size, className, ariaLabel }: PlusButtonProps) => {
  return <button aria-label={ariaLabel} className={`${className} border rounded-full bg-slate-300 text-slate-400 hover:text-slate-500 hover:border-slate-500`}
    onClick={() => onClick()}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </button>
}

export const Close = ({ onClick, size, className, ariaLabel }: CloseProps) => {
  return (
    <button onClick={onClick} className={className} aria-label={ariaLabel}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="1.5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          fill={"currentColor"}
        />
      </svg>
    </button>
  );
};
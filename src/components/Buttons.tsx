interface PlusButtonProps {
  onClick: () => void;
  size: string;
  className?: string;
}

export const PlusButton = ({ onClick, size, className }: PlusButtonProps) => {
  return <button className={`${className} border rounded-full bg-slate-300 text-slate-400 hover:text-slate-500 hover:border-slate-500`}
    onClick={() => onClick()}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  </button>
}
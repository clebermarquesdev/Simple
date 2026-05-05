interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <span className="text-xl text-on-surface-variant">
          Passo {current} de {total}
        </span>
        <div className="bg-secondary text-on-secondary px-3 py-1 rounded-full text-sm font-semibold tracking-wide flex items-center gap-1 shadow-sm">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontSize: "18px" }}
          >
            school
          </span>
          Iniciante
        </div>
      </div>
      <div className="h-4 bg-surface-container-high rounded-full w-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Passo ${current} de ${total}`}
        />
      </div>
    </div>
  );
}

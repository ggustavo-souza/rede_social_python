interface ProgressBarProps {
    point: number
}

export default function ProgressBar({ point }: ProgressBarProps) {
    const steps = 4;
    return (
        <div className="flex gap-2 w-full max-w-xs mx-auto my-6">
            {Array.from({ length: steps }).map((_, index) => (
                <div 
                    key={index} 
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${index <= point ? 'bg-[var(--color-secondary)]' : 'bg-gray-300'}`}
                />
            ))}
        </div>
    )
}
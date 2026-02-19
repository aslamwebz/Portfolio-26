import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: 0 | 1 | 2 | 3;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function Reveal({
    children,
    className,
    delay = 0,
    direction = 'up',
}: RevealProps) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const directionStyles = {
        up: 'translate-y-6',
        down: '-translate-y-6',
        left: 'translate-x-6',
        right: '-translate-x-6',
    };

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700 ease-out',
                !isVisible && `opacity-0 ${directionStyles[direction]}`,
                isVisible && 'translate-x-0 translate-y-0 opacity-100',
                delay === 1 && 'delay-100',
                delay === 2 && 'delay-200',
                delay === 3 && 'delay-300',
                className,
            )}
        >
            {children}
        </div>
    );
}

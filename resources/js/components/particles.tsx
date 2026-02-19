import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
}

export default function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const particleCount = 25;
        particlesRef.current = Array.from(
            { length: particleCount },
            (): Particle => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2,
            }),
        );

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        let frameCount = 0;
        const animate = () => {
            frameCount++;
            // Render every 2nd frame for performance
            if (frameCount % 2 === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particlesRef.current.forEach((particle, i) => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size,
                        0,
                        Math.PI * 2,
                    );
                    ctx.fillStyle = `rgba(52, 211, 153, ${particle.alpha})`;
                    ctx.fill();

                    // Draw connections (only check every 5th particle for performance)
                    if (i % 5 === 0) {
                        particlesRef.current.slice(i + 1).forEach((other) => {
                            const dx = particle.x - other.x;
                            const dy = particle.y - other.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 100) {
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.strokeStyle = `rgba(52, 211, 153, ${0.1 * (1 - distance / 100)})`;
                                ctx.stroke();
                            }
                        });
                    }
                });
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

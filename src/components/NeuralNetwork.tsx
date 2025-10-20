import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const nodes: Node[] = [];
    const nodeCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let sparklePhase = 0;

    const animate = () => {
      // Soft pink and purple gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(253, 242, 248, 0.3)');
      bgGradient.addColorStop(0.5, 'rgba(243, 232, 255, 0.3)');
      bgGradient.addColorStop(1, 'rgba(253, 242, 248, 0.3)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      sparklePhase += 0.02;

      nodes.forEach((node, index) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Sparkle effect with pulsating size
        const sparkle = Math.sin(sparklePhase + index * 0.5) * 0.5 + 0.5;
        const glowSize = 12 + sparkle * 8;

        // Outer sparkle glow (pink-purple gradient)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        gradient.addColorStop(0, `rgba(236, 72, 153, ${0.9 * sparkle})`);
        gradient.addColorStop(0.3, `rgba(168, 85, 247, ${0.6 * sparkle})`);
        gradient.addColorStop(0.6, `rgba(192, 132, 252, ${0.3 * sparkle})`);
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Middle glow layer
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 207, 232, ${0.8 + sparkle * 0.2})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Inner bright sparkle core
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections with pink-purple gradient
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.6;
            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, `rgba(236, 72, 153, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(168, 85, 247, ${opacity})`);
            gradient.addColorStop(1, `rgba(192, 132, 252, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

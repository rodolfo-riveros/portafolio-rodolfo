import { useEffect, useRef } from 'react';
import { useApp } from '../AppContext';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();
  const themeRef = useRef(theme);

  // Sync theme status to ref for high-performance retrieval in render loop
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;

    // Shader source code
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform float u_lightMode;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Pseudo-random noise helper
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Complex background nebula effect using multiple layers of noise
        float t = u_time * 0.05;
        vec2 st = uv * 3.0;
        float n = noise(st + vec2(t, t * 0.5)) * 0.5 + noise(st * 2.0 - vec2(t * 0.8, -t)) * 0.25;
        
        // Interactive glow centered on mouse
        float dist = distance(uv, mouse);
        float glow = 0.08 / (dist + 0.25);
        
        // Dynamic base color shifting between cosmic space and high-contrast light mist
        vec3 baseColor = mix(vec3(0.012, 0.031, 0.055), vec3(0.94, 0.97, 0.97), u_lightMode); 
        
        // Nebula cloud colors (cyan/teal, emerald, and deep violet/lavender)
        vec3 cloudColor1 = mix(vec3(0.0, 0.86, 0.91), vec3(0.0, 0.45, 0.52), u_lightMode); // Teal
        vec3 cloudColor2 = mix(vec3(0.3, 0.87, 0.64), vec3(0.0, 0.58, 0.38), u_lightMode); // Secondary Emerald
        vec3 cloudColor3 = mix(vec3(0.58, 0.15, 0.82), vec3(0.42, 0.14, 0.64), u_lightMode); // Deep purple
        
        // Blend nebula
        vec3 nebula = mix(baseColor, cloudColor1, n * 0.25);
        nebula = mix(nebula, cloudColor3, sin(uv.y * 3.14) * 0.08);
        
        // Apply interactive glow with responsive colors
        vec3 finalColor = nebula + cloudColor1 * glow * 0.4 + cloudColor2 * (glow * 0.15);
        
        // Gentle stars sparkling in the background
        float starNoise = pow(sin(uv.x * 250.0 + sin(uv.y * 314.0)) * cos(uv.y * 250.0 + cos(uv.x * 314.0)), 15.0);
        float stars = starNoise * (0.15 + 0.1 * sin(u_time * 2.0 + hash(uv) * 6.28));
        float starIntensity = mix(1.0, 0.15, u_lightMode);
        finalColor += vec3(0.86, 0.98, 1.0) * stars * starIntensity;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper to compile shaders
    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uLightMode = gl.getUniformLocation(program, 'u_light_mode') || gl.getUniformLocation(program, 'u_lightMode');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    // Default mouse pos is center
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        // Flip Y for WebGL coordinates
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouseX = nx * canvas.width;
        mouseY = ny * canvas.height;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const nx = (e.touches[0].clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.touches[0].clientY - rect.top) / rect.height;
        mouseX = nx * canvas.width;
        mouseY = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    resizeCanvas();

    // Render loop
    const startTime = performance.now();
    const render = () => {
      const elapsedSeconds = (performance.now() - startTime) / 1000.0;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      if (uTime) gl.uniform1f(uTime, elapsedSeconds);
      if (uLightMode) gl.uniform1f(uLightMode, themeRef.current === 'light' ? 1.0 : 0.0);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      id="global-shader-bg"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none opacity-50 transition-opacity duration-500"
    />
  );
}

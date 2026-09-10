import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import worldMap from "../data/world.json";
import {
  Check,
  CircleDashed,
  Code2,
  Crosshair,
  MapPin,
  Minus,
  Moon,
  Pause,
  Play,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Sun,
} from "lucide-react";

const PROJECTS = [
  {
    id: "tokyo",
    name: "The Helix Pavilion",
    city: "Tokyo, Japan",
    location: [35.6762, 139.6503],
    status: "Completed 2024",
    type: "Cultural & Civic",
    stats: "24,000 m² • Carbon Negative",
    desc: "Parametric cedar and bio-composite structure integrating tidal cooling.",
    color: "#0284c7",
  },
  {
    id: "oslo",
    name: "Nordic Fjord Opera",
    city: "Oslo, Norway",
    location: [59.9139, 10.7522],
    status: "Under Construction",
    type: "Performing Arts",
    stats: "18,500 m² • Glacial Stone",
    desc: "A cantilevered monolithic slate pavilion extending over fjord waters.",
    color: "#0f172a",
  },
  {
    id: "sf",
    name: "Bay Biome Tower",
    city: "San Francisco, USA",
    location: [37.7749, -122.4194],
    status: "Design Phase",
    type: "Urban Forestry",
    stats: "42 Floors • Net-Zero Energy",
    desc: "A vertical botanical tower filtering coastal marine fog into greywater.",
    color: "#2563eb",
  },
  {
    id: "dubai",
    name: "Oasis Mirage Center",
    city: "Dubai, UAE",
    location: [25.2048, 55.2708],
    status: "Completed 2023",
    type: "Research Hub",
    stats: "31,000 m² • Solar Aerogel",
    desc: "A kinetic shading facade responding to thermal sunlight angles.",
    color: "#d97706",
  },
  {
    id: "london",
    name: "Thames Kinetic Gallery",
    city: "London, UK",
    location: [51.5074, -0.1278],
    status: "Final Commission",
    type: "Public Museum",
    stats: "14,200 m² • Recycled Steel",
    desc: "A tide-responsive floating gallery powered by river turbines.",
    color: "#4f46e5",
  },
  {
    id: "singapore",
    name: "Solar Canopy Gardens",
    city: "Singapore",
    location: [1.3521, 103.8198],
    status: "Completed 2024",
    type: "Biophilic Mixed-Use",
    stats: "29,000 m² • Native Flora",
    desc: "A ventilated living envelope nurturing vertical rainforests.",
    color: "#059669",
  },
];
const THEMES = {
  lightswind: {
    name: "Lightswind White",
    light: true,
    dot: "#0a0d14",
    accent: "#0f172a",
  },
  minimalDark: {
    name: "Cyber Dark",
    light: false,
    dot: "#38bdf8",
    accent: "#38bdf8",
  },
  aurora: {
    name: "Solar Amber",
    light: false,
    dot: "#fbbf24",
    accent: "#f59e0b",
  },
};
// Natural Earth country boundaries, kept locally so the globe stays fully
// functional without making a network request in the browser.
const COUNTRY_SHAPES = worldMap.features.flatMap(({ geometry }) => {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
});

function inside([x, y], polygon) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i],
      [xj, yj] = polygon[j];
    if (
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi || 0.00001) + xi
    )
      result = !result;
  }
  return result;
}

function isLand(point) {
  return COUNTRY_SHAPES.some(([outerRing, ...holes]) =>
    inside(point, outerRing) && !holes.some((hole) => inside(point, hole)),
  );
}

const DOTS = (() => {
  const dots = [];
  for (let lat = -85; lat <= 83; lat += 2.35) {
    const step = 2.6 / Math.max(0.2, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += step) {
      if (!isLand([lon, lat])) continue;
      const phi = ((90 - lat) * Math.PI) / 180,
        theta = ((lon + 180) * Math.PI) / 180;
      dots.push({
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      });
    }
  }
  return dots;
})();
function Toggle({ on, setOn, light }) {
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className={`relative h-5 w-9 rounded-full transition ${on ? (light ? "bg-slate-900" : "bg-cyan-400") : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`}
      />
    </button>
  );
}

export default function LocationGlobe() {
  const canvasRef = useRef(null),
    frameRef = useRef(null);
  const rotation = useRef({
    phi: 0.85,
    theta: 0.28,
    targetPhi: 0.85,
    targetTheta: 0.28,
    dragging: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });
  const [themeKey, setThemeKey] = useState("lightswind"),
    [autoRotate, setAutoRotate] = useState(true),
    [speed, setSpeed] = useState(0.003),
    [zoom, setZoom] = useState(1),
    [glow, setGlow] = useState(true),
    [rings, setRings] = useState(false),
    [category, setCategory] = useState("All"),
    [active, setActive] = useState(PROJECTS[0]);
  const theme = THEMES[themeKey],
    light = theme.light;
  const projects = useMemo(
    () =>
      category === "All"
        ? PROJECTS
        : PROJECTS.filter((project) =>
            project.type.toLowerCase().includes(category.toLowerCase()),
          ),
    [category],
  );
  const focus = useCallback((project) => {
    rotation.current.targetPhi = -((project.location[1] + 90) * Math.PI) / 180;
    rotation.current.targetTheta = Math.max(
      -0.8,
      Math.min(0.8, ((project.location[0] * Math.PI) / 180) * 0.7),
    );
  }, []);
  const selectProject = useCallback(
    (project) => {
      setActive(project);
      focus(project);
    },
    [focus],
  );
  const clampZoom = useCallback(
    (value) => setZoom(Math.max(0.75, Math.min(1.55, value))),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    let mounted = true;
    const draw = () => {
      if (!mounted) return;
      const state = rotation.current;
      if (autoRotate && !state.dragging) state.targetPhi += speed;
      if (!state.dragging) {
        state.targetPhi += state.vx;
        state.targetTheta = Math.max(
          -0.85,
          Math.min(0.85, state.targetTheta + state.vy),
        );
        state.vx *= 0.92;
        state.vy *= 0.92;
      }
      state.phi += (state.targetPhi - state.phi) * 0.12;
      state.theta += (state.targetTheta - state.theta) * 0.12;
      const width = canvas.clientWidth,
        height = canvas.clientHeight,
        dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const cx = width / 2,
        cy = height / 2,
        radius = (Math.min(width, height) / 2 - 20) * zoom;
      const gradient = context.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.35,
        radius * 0.04,
        cx,
        cy,
        radius,
      );
      if (light) {
        gradient.addColorStop(0, "#fff");
        gradient.addColorStop(0.75, "#fbfcfe");
        gradient.addColorStop(1, "#e2e8f0");
      } else {
        gradient.addColorStop(0, "#18233a");
        gradient.addColorStop(0.78, "#0b0f19");
        gradient.addColorStop(1, "#05070e");
      }
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = light
        ? "rgba(148,163,184,.3)"
        : "rgba(56,189,248,.3)";
      context.stroke();
      const cp = Math.cos(state.phi),
        sp = Math.sin(state.phi),
        ct = Math.cos(state.theta),
        st = Math.sin(state.theta);
      const rotate = (point) => {
        const x = point.x * cp - point.z * sp,
          z = point.x * sp + point.z * cp;
        return { x, y: point.y * ct - z * st, z: point.y * st + z * ct };
      };
      context.fillStyle = theme.dot;
      DOTS.forEach((dot) => {
        const point = rotate(dot);
        if (point.z <= 0.02) return;
        context.globalAlpha = Math.min(1, 0.22 + point.z * 0.85);
        context.beginPath();
        context.arc(
          cx + point.x * radius,
          cy - point.y * radius,
          Math.max(0.6, 0.7 + point.z),
          0,
          Math.PI * 2,
        );
        context.fill();
      });
      context.globalAlpha = 1;
      projects.forEach((project) => {
        const [lat, lon] = project.location,
          phi = ((90 - lat) * Math.PI) / 180,
          theta = ((lon + 180) * Math.PI) / 180,
          point = rotate({
            x: -Math.sin(phi) * Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi) * Math.sin(theta),
          });
        if (point.z <= 0.1) return;
        const x = cx + point.x * radius,
          y = cy - point.y * radius,
          selected = active.id === project.id;
        context.save();
        context.fillStyle = project.color;
        context.shadowColor = project.color;
        context.shadowBlur = selected ? 14 : 7;
        context.beginPath();
        context.arc(x, y, selected ? 6.5 : 4, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        context.lineWidth = 2;
        context.strokeStyle = light ? "#fff" : "#0f172a";
        context.stroke();
        if (selected) {
          context.beginPath();
          context.arc(x, y, 11, 0, Math.PI * 2);
          context.lineWidth = 1.5;
          context.strokeStyle = project.color;
          context.stroke();
        }
        context.font = "600 10px system-ui";
        context.fillStyle = light ? "#0f172a" : "#f8fafc";
        context.fillText(project.name.split(" ")[0], x + 9, y + 3);
        context.restore();
      });
      if (rings) {
        context.beginPath();
        context.arc(cx, cy, radius * 1.07, 0, Math.PI * 2);
        context.strokeStyle = light
          ? "rgba(148,163,184,.5)"
          : "rgba(56,189,248,.4)";
        context.setLineDash([4, 6]);
        context.stroke();
        context.setLineDash([]);
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      mounted = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [active, autoRotate, light, projects, rings, speed, theme.dot, zoom]);
  const onWheel = (event) => {
    event.preventDefault();
    clampZoom(zoom - event.deltaY * 0.0012);
  };
  const down = (event) => {
    const s = rotation.current;
    s.dragging = true;
    s.x = event.clientX;
    s.y = event.clientY;
    s.vx = 0;
    s.vy = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const move = (event) => {
    const s = rotation.current;
    if (!s.dragging) return;
    const dx = event.clientX - s.x,
      dy = event.clientY - s.y;
    s.x = event.clientX;
    s.y = event.clientY;
    s.targetPhi += dx * 0.0055;
    s.targetTheta = Math.max(
      -0.85,
      Math.min(0.85, s.targetTheta - dy * 0.0055),
    );
    s.vx = dx * 0.0055;
    s.vy = -dy * 0.0055;
  };
  const reset = () => {
    rotation.current.targetPhi = 0.85;
    rotation.current.targetTheta = 0.28;
    setZoom(1);
  };
  const panel = light
      ? "bg-white border-slate-200 text-slate-900"
      : "bg-slate-900/75 border-slate-800 text-slate-100",
    muted = light ? "text-slate-500" : "text-slate-400";
  return (
    <section
      className={`relative min-h-screen overflow-hidden ${light ? "bg-white text-slate-900" : "bg-[#05070e] text-slate-100"}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-60 ${light ? "bg-[radial-gradient(#cbd5e1_1px,transparent_1px)]" : "bg-[radial-gradient(#334155_1px,transparent_1px)]"} [background-size:24px_24px]`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] transition-opacity ${glow ? (light ? "bg-slate-100 opacity-70" : "bg-sky-600 opacity-25") : "opacity-0"}`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${light ? "border-slate-200/80" : "border-slate-800/70"}`}
      />
      <header
        className={`relative z-10 flex items-center justify-between gap-4 border-b px-5 py-3 backdrop-blur-md sm:px-7 ${light ? "border-slate-200 bg-white/85" : "border-slate-800 bg-slate-950/75"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`grid h-9 w-9 place-items-center rounded-xl text-sm font-black ${light ? "bg-slate-900 text-white" : "bg-white text-slate-950"}`}
          >
            L
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight">
                Lightswind Globe
              </span>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase ${light ? "border-slate-300 bg-slate-100 text-slate-700" : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"}`}
              >
                3D canvas
              </span>
            </div>
            <p className={`hidden text-[10px] sm:block ${muted}`}>
              Portfolio sites around the world
            </p>
          </div>
        </div>
        <div
          className={`hidden items-center gap-1 rounded-xl border p-1 md:flex ${light ? "border-slate-200 bg-slate-100/90" : "border-slate-800 bg-slate-900/80"}`}
        >
          {["All", "Cultural", "Urban", "Research"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-lg px-3 py-1 text-xs transition ${category === item ? (light ? "bg-white font-semibold shadow-sm" : "bg-cyan-400 font-semibold text-slate-950") : muted}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setThemeKey(light ? "minimalDark" : "lightswind")}
            className={`rounded-xl border p-2 ${panel}`}
            aria-label="Toggle theme"
          >
            {light ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] ${autoRotate ? (light ? "border-slate-900 bg-slate-900 text-white" : "border-cyan-500/40 bg-cyan-950/60 text-cyan-200") : panel}`}
          >
            {autoRotate ? <Pause size={13} /> : <Play size={13} />}
            {autoRotate ? "Rotating" : "Paused"}
          </button>
        </div>
      </header>
      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 px-5 py-8 lg:grid-cols-12 lg:px-7">
        <aside className="space-y-4 lg:col-span-4">
          <div className="space-y-2">
            <p
              className={`flex items-center gap-2 font-mono text-[10px] tracking-[.16em] ${muted}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${light ? "bg-slate-900" : "bg-cyan-400"}`}
              />
              MINIMAL 3D HALFTONE GLOBE
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Prismatic{" "}
              <span
                className={
                  light
                    ? "underline decoration-slate-300 decoration-wavy"
                    : "bg-gradient-to-r from-cyan-300 to-sky-100 bg-clip-text text-transparent"
                }
              >
                Dotted Earth
              </span>
            </h1>
            <p className={`max-w-md text-xs leading-relaxed ${muted}`}>
              Explore a real-time stippled globe with responsive rotation,
              smooth zoom, and architectural portfolio markers.
            </p>
          </div>
          <article className={`rounded-2xl border p-4 shadow-md ${panel}`}>
            <div className="flex justify-between gap-3">
              <div>
                <span
                  className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] font-semibold uppercase ${light ? "bg-slate-100 text-slate-700" : "bg-slate-800 text-cyan-300"}`}
                >
                  {active.type}
                </span>
                <h2 className="mt-1 text-lg font-bold">{active.name}</h2>
                <p
                  className={`mt-0.5 flex items-center gap-1 text-xs ${muted}`}
                >
                  <MapPin size={12} />
                  {active.city}
                </p>
              </div>
              <span
                className="mt-1 h-2.5 w-2.5 animate-ping rounded-full"
                style={{ background: active.color }}
              />
            </div>
            <p className={`mt-3 text-xs leading-relaxed ${muted}`}>
              {active.desc}
            </p>
            <div
              className={`mt-3 grid grid-cols-2 gap-2 border-t pt-3 text-[11px] ${light ? "border-slate-100" : "border-slate-800"}`}
            >
              <div>
                <span className="block font-mono text-[9px] text-slate-400">
                  METRICS
                </span>
                {active.stats}
              </div>
              <div>
                <span className="block font-mono text-[9px] text-slate-400">
                  STATUS
                </span>
                <span className={light ? "text-slate-800" : "text-cyan-300"}>
                  {active.status}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => focus(active)}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold ${light ? "bg-slate-900 text-white" : "bg-cyan-400 text-slate-950"}`}
              >
                <Crosshair size={14} />
                Center on globe
              </button>
              <span className="font-mono text-[9px] text-slate-400">
                {active.location[0].toFixed(2)}°,{" "}
                {active.location[1].toFixed(2)}°
              </span>
            </div>
          </article>
          <div>
            <p className="mb-1.5 px-1 font-mono text-[10px] tracking-wider text-slate-400">
              PORTFOLIO HUBS ({projects.length})
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {projects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => selectProject(project)}
                  className={`flex items-center gap-2 rounded-xl border p-2 text-left transition ${active.id === project.id ? (light ? "border-slate-900 bg-slate-900 text-white" : "border-cyan-500/60 bg-cyan-950/70 text-white") : panel}`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: project.color }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium">
                      {project.name}
                    </span>
                    <span
                      className={`block truncate text-[10px] ${active.id === project.id ? "text-slate-300" : "text-slate-400"}`}
                    >
                      {project.city}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        <div className="relative flex flex-col items-center justify-center lg:col-span-5">
          <button
            type="button"
            onClick={reset}
            className={`absolute right-1 top-1 z-10 rounded-full border p-2 shadow-sm ${panel}`}
            aria-label="Reset globe"
          >
            <RotateCcw size={15} />
          </button>
          <div
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={() => {
              rotation.current.dragging = false;
            }}
            onPointerLeave={() => {
              rotation.current.dragging = false;
            }}
            onWheel={onWheel}
            className="aspect-square w-full max-w-[530px] touch-none cursor-grab active:cursor-grabbing"
          >
            <canvas ref={canvasRef} className="block h-full w-full" />
          </div>
          <div
            className={`mt-3 rounded-full border px-4 py-1.5 text-[11px] shadow-sm backdrop-blur ${panel}`}
          >
            <span className="mr-2 text-amber-500">💡</span>Scroll to zoom · Drag
            to rotate
          </div>
        </div>
        <aside className="space-y-4 lg:col-span-3">
          <div className={`rounded-2xl border p-5 shadow-sm ${panel}`}>
            <div
              className={`mb-4 flex items-center justify-between border-b pb-3 ${light ? "border-slate-100" : "border-slate-800"}`}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={16}
                  className={light ? "text-slate-800" : "text-cyan-300"}
                />
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Globe controls
                </h2>
              </div>
              <span
                className={`rounded px-2 py-0.5 font-mono text-[9px] ${light ? "bg-slate-100" : "bg-cyan-950 text-cyan-300"}`}
              >
                60 FPS
              </span>
            </div>
            <div className="space-y-2">
              <label className={`text-xs font-medium ${muted}`}>
                Preset aesthetic
              </label>
              {Object.entries(THEMES).map(([key, value]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setThemeKey(key)}
                  className={`flex w-full items-center justify-between rounded-xl border p-2 text-left text-xs transition ${themeKey === key ? (light ? "border-slate-900 bg-slate-900 text-white" : "border-cyan-400 bg-slate-800 text-white") : panel}`}
                >
                  <span className="flex items-center gap-2">
                    <i
                      className="h-3 w-3 rounded-full border border-black/10"
                      style={{ background: value.accent }}
                    />
                    {value.name}
                  </span>
                  {themeKey === key && <Check size={14} />}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className={muted}>Zoom magnification</span>
                <span className="font-mono">{zoom.toFixed(2)}x</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => clampZoom(zoom - 0.15)}
                  className={`rounded-lg border p-1.5 ${panel}`}
                >
                  <Minus size={13} />
                </button>
                <input
                  aria-label="Zoom magnification"
                  className="w-full accent-slate-900"
                  type="range"
                  min="0.75"
                  max="1.55"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                />
                <button
                  type="button"
                  onClick={() => clampZoom(zoom + 0.15)}
                  className={`rounded-lg border p-1.5 ${panel}`}
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className={muted}>Auto-spin speed</span>
                <span className="font-mono">{(speed * 1000).toFixed(1)}x</span>
              </div>
              <input
                aria-label="Auto-spin speed"
                className="w-full accent-slate-900 disabled:opacity-30"
                type="range"
                min="0.0005"
                max="0.008"
                step="0.0005"
                value={speed}
                disabled={!autoRotate}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
            <div
              className={`mt-4 space-y-3 border-t pt-4 ${light ? "border-slate-100" : "border-slate-800"}`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className={muted} />
                  Atmospheric glow
                </span>
                <Toggle on={glow} setOn={setGlow} light={light} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <CircleDashed size={14} className={muted} />
                  Orbital grid ring
                </span>
                <Toggle on={rings} setOn={setRings} light={light} />
              </div>
            </div>
            <div
              className={`mt-4 border-t pt-3 ${light ? "border-slate-100" : "border-slate-800"}`}
            >
              <div
                className={`mb-1 flex items-center justify-between font-mono text-[10px] ${muted}`}
              >
                REACT CANVAS PROPS
                <Code2 size={13} />
              </div>
              <code
                className={`block rounded-lg border p-2 text-[9px] leading-relaxed ${light ? "border-slate-200 bg-slate-50" : "border-slate-800 bg-slate-950 text-cyan-200"}`}
              >
                createGlobe(canvas, &#123;
                <br />
                &nbsp;&nbsp;dark: {light ? "0" : "1"},<br />
                &nbsp;&nbsp;mapSamples: 20000
                <br />
                &#125;)
              </code>
            </div>
          </div>
          <div
            className={`flex items-center justify-between rounded-xl border p-3 text-[11px] ${panel}`}
          >
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Halftone shader active
            </span>
            <span className="font-mono text-slate-400">canvas 2D</span>
          </div>
        </aside>
      </main>
    </section>
  );
}

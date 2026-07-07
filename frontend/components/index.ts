// 3D Components
export { Scene3D, DashboardScene3D } from "./3d/Scene3D";

// Effects
export {
  CursorFollower,
  ParticleTrail,
  SpotlightOverlay,
  ClickRipple,
} from "./effects/CursorFollower";

// Hooks
export {
  useMousePosition,
  useScrollParallax,
  useMouseParallax,
  useTilt,
  useSpotlight,
  useFloat,
  useHover,
  useInView,
  useScrollVelocity,
} from "@/hooks/useSpatial";

// Motion Presets
export * from "@/lib/motion-presets";
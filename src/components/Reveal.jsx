import { useReveal } from "../hooks/useReveal";

// Generic scroll-reveal wrapper: fades/slides children in once they
// enter the viewport. Optional `delay` (ms) lets sibling items stagger.
export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useReveal();
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? " " + className : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

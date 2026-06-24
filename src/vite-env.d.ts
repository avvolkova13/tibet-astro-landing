/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*?final-cta-fidelity-app-19' {
  const component: import('react').ComponentType;
  export default component;
}

declare module '*.module.css?final-cta-fidelity-19' {
  const classes: Record<string, string>;
  export default classes;
}

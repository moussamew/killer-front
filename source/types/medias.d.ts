declare module '*.svg' {
  import type * as React from 'react';

  const content: React.FC<React.SVGProps<SVGElement> & { title?: string }>;
  export default content;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

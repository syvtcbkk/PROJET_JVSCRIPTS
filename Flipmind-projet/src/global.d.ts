declare module '*.module.css';
declare module '*.css';

declare module 'react' {
  export type FC<P = {}> = any;
  export type ReactNode = any;
  export type CSSProperties = any;
  export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T = any>(initialValue: T): { current: T };
  export const Fragment: any;
  export default any;
}

declare module 'react-dom' {
  export function createRoot(container: any): { render(element: any): void };
  export function render(element: any, container: any): void;
  export default any;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export function jsxDEV(type: any, props: any, key?: any): any;
  export const Fragment: any;
}

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly [key: string]: string | boolean | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare namespace JSX {
  interface Element {}
  interface ElementClass {}
  interface ElementAttributesProperty {
    props: any;
  }
  interface ElementChildrenAttribute {
    children: any;
  }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

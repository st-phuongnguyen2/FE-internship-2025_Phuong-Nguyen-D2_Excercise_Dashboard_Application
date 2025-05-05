import { JSX } from 'react';

export interface PageRoute {
  path: string;
  component?: (() => JSX.Element) | React.LazyExoticComponent<() => JSX.Element>;
  isProtected?: boolean; // default is false,
  redirect?: string;
  children?: PageRoute[];
  loader?: () => Promise<unknown>;
}

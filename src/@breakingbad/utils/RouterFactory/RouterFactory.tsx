import { LazyExoticComponent, ComponentType } from 'react';

interface ComponentsString {
  [key: string]: LazyExoticComponent<ComponentType<any>>;
}

export interface ComponentRoute {
  componentKey: string;
  componentLazyModule: LazyExoticComponent<ComponentType<any>>;
}

const Components: ComponentsString = {};
let defaultComponent: LazyExoticComponent<ComponentType>;

export function createRouterFactory(
  componentRouteList: Array<ComponentRoute>,
  defaultLazyComponentModule: LazyExoticComponent<ComponentType<any>>
) {
  componentRouteList.forEach(({ componentKey, componentLazyModule }) => {
    Components[componentKey] = componentLazyModule;
  });
  defaultComponent = defaultLazyComponentModule;
}

export const getComponent = (name: string) => Components[name] || defaultComponent;
export const getDefault = () => defaultComponent;

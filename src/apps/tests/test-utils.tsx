import type { PropsWithChildren, ReactElement } from "react";
// types

import { render, type RenderOptions } from "@testing-library/react";
// test utils

import GlobalThemeProvider from "@renderer/styles/GlobalThemeProvider";
// providers

function AllTheProviders({ children }: PropsWithChildren<unknown>) {
  return <GlobalThemeProvider>{children}</GlobalThemeProvider>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

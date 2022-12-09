import type { ReactNode, MouseEvent } from "react";
// types

import { createContext, useCallback, useContext, useState } from "react";
// React module

import { ContextMenus } from "@renderer/components/common/ContextMenu";
// components

export interface ContextMenuItem {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
}

export type ContextMenuItems = ContextMenuItem[];

type ContextMenuContextType = (menus: ContextMenuItems, point: Point) => void;

const ContextMenuContext = createContext<ContextMenuContextType>(() => {});

export const useContextMenu = () => {
  const onOpenMenus = useContext(ContextMenuContext);

  return useCallback(
    (menus: ContextMenuItems) => (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX, clientY } = e;
      onOpenMenus(menus, { x: clientX, y: clientY });
    },
    [onOpenMenus]
  );
};

interface ContextMenuProviderProps {
  children: ReactNode;
}

export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const [menus, setMenus] = useState<ContextMenuItems | null>(null);
  const [position, setPosition] = useState<Point>({ x: -1, y: -1 });

  const onOpenMenus = useCallback((menus: ContextMenuItems, point: Point) => {
    setMenus(() => menus);
    setPosition(() => point);
  }, []);

  const onCloseMenus = useCallback(() => setMenus(null), []);

  return (
    <ContextMenuContext.Provider value={onOpenMenus}>
      {children}
      {menus && (
        <ContextMenus
          menus={menus}
          onClose={onCloseMenus}
          position={position}
        />
      )}
    </ContextMenuContext.Provider>
  );
};

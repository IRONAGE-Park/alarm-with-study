import type {
  ContextMenuItem,
  ContextMenuItems,
} from "@renderer/common/contexts/ContextMenuContext";
// types

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
// React module

import useOutsideClick from "@renderer/common/hooks/useOutsideClick";
// hooks

import {
  StyleContextMenu,
  StyleContextMenuButton,
  StyleContextMenuList,
  StyleContextMenuListBox,
} from "@renderer/common/components/ContextMenu.style";
// styles

interface ContextMenuProps extends ContextMenuItem {}

const ContextMenu = ({ name, onClick, disabled }: ContextMenuProps) => {
  const disabledState = useMemo(
    () => disabled || onClick === undefined,
    [disabled, onClick]
  );

  return (
    <StyleContextMenu disabled={disabledState}>
      <StyleContextMenuButton onClick={onClick} disabled={disabledState}>
        {name}
      </StyleContextMenuButton>
    </StyleContextMenu>
  );
};

interface ContextMenuListProps {
  menus: ContextMenuItems;
  onClose: () => void;
  position: Point;
}

const ContextMenuList = ({
  menus,
  onClose,
  position,
}: ContextMenuListProps) => {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  const [point, setPoint] = useState<Point | null>(null);

  const onKeydown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // 다른 이벤트가 발생하지 않도록 제거
      switch (e.key) {
        case "Escape":
          onClose();
          break;
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);

    const { innerWidth, innerHeight } = window;
    const { x, y } = position;
    const { current } = ref;

    if (current) {
      const { clientWidth, clientHeight } = current;

      setPoint({
        x: innerWidth - x > clientWidth ? x : x - clientWidth,
        y: innerHeight - y > clientHeight ? y : y - clientHeight,
      });
    }

    return () => window.removeEventListener("keydown", onKeydown);
  }, [onKeydown, position]);

  return (
    <StyleContextMenuListBox
      ref={ref}
      style={{ top: point?.y, left: point?.x }}
      onClick={onClose}
    >
      <StyleContextMenuList>
        {menus.map(menu => (
          <ContextMenu key={JSON.stringify(menu.name)} {...menu} />
        ))}
      </StyleContextMenuList>
    </StyleContextMenuListBox>
  );
};

export const ContextMenus = memo(ContextMenuList);

export default ContextMenu;

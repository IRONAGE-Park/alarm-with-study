import { type DragEventHandler, useCallback, useEffect, useState } from "react";
// React module

import Loading from "@renderer/components/common/Loading";
// components

import { useCustomConfirm } from "@renderer/contexts/CustomDialogContext";
// contexts

import { StyleDropImport } from "@renderer/components/common/DropImport.style";
// styles

export const useDragOver = (): [boolean, () => void, () => void] => {
  const [dragOver, setDragOver] = useState(false);

  const onDragEnter = useCallback(() => {
    setDragOver(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragOver(false);
  }, []);

  return [dragOver, onDragEnter, onDragEnd];
};

interface DropImportProps {
  message: string;
  dragOver: boolean;
  onDragEnd: () => void;
  callback: (files: FileList) => Promise<void>;
}

const DropImport = ({
  message,
  dragOver,
  onDragEnd,
  callback,
}: DropImportProps) => {
  const onOpenCustomConfirm = useCustomConfirm();

  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAnimationEnd = useCallback(() => {
    if (!dragOver) {
      setRender(false);
    }
  }, [dragOver]);

  const onDragOver: DragEventHandler = useCallback(e => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onDrop: DragEventHandler = useCallback(
    e => {
      const { files } = e.dataTransfer;

      onOpenCustomConfirm("Hi", ["Hello"], async () => {
        setLoading(true);
        await callback(files);
        setLoading(false);
      });

      onDragEnd();
      e.stopPropagation();
      e.preventDefault();
    },
    [callback, onDragEnd, onOpenCustomConfirm]
  );

  useEffect(() => {
    if (dragOver) {
      setRender(true);
    }
  }, [dragOver]);

  return (
    <>
      {render && (
        <>
          <StyleDropImport
            dragOver={dragOver}
            onDragOverCapture={onDragOver}
            onDragLeave={onDragEnd}
            onDrop={onDrop}
            onAnimationEnd={onAnimationEnd}
          >
            {message}
          </StyleDropImport>
          <Loading loading={loading} style={{ position: "absolute" }} />
        </>
      )}
    </>
  );
};

export default DropImport;

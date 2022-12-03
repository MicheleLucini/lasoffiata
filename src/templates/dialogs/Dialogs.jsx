import React, { useMemo, useEffect } from "react";
import { useDialogs } from "@contexts/DialogsContext";
import Dialog from './Dialog';

const Dialogs = () => {
  const { activeDialogs } = useDialogs();

  const areDialogsActive = useMemo(() => {
    return activeDialogs.length > 0;
  }, [activeDialogs]);

  const activeDialogsComponents = useMemo(() => {
    return activeDialogs.map((x) => (
      <Dialog key={x.id} {...x} />
    ));
  }, [activeDialogs]);

  useEffect(() => {
    if (areDialogsActive) {
      document.body.classList.add("block_scroll");
    } else {
      document.body.classList.remove("block_scroll");
    }
    return () => {
      document.body.classList.remove("block_scroll");
    }
  }, [areDialogsActive])

  if (!areDialogsActive) {
    return null;
  }

  return (
    <>
      {activeDialogsComponents}
    </>
  );
};

export default Dialogs;

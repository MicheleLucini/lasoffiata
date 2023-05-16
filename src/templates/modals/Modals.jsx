import React, { useMemo, useEffect } from "react";
import { useModals } from "@contexts/ModalsContext";
import Modal from './Modal';

const Modals = () => {
  const { activeModals } = useModals();

  const areModalsActive = useMemo(() => {
    return activeModals.length > 0;
  }, [activeModals]);

  const activeModalsComponents = useMemo(() => {
    return activeModals.map((x) => (
      <Modal key={x.id} {...x} />
    ));
  }, [activeModals]);

  useEffect(() => {
    if (areModalsActive) {
      document.body.classList.add("block_scroll");
    } else {
      document.body.classList.remove("block_scroll");
    }
    return () => {
      document.body.classList.remove("block_scroll");
    }
  }, [areModalsActive])

  if (!areModalsActive) {
    return null;
  }

  return (
    <>
      {activeModalsComponents}
    </>
  );
};

export default Modals;

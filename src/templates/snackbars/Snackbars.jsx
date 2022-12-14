import React, { useMemo } from "react";
import { useSnackbar } from "@contexts/SnackbarContext";
import Snackbar from './Snackbar';

const Snackbars = () => {
  const { activeSnackbars } = useSnackbar();

  const activeSnackbarsComponents = useMemo(() => {
    return activeSnackbars.map((x) => (
      <Snackbar key={x.id} {...x} />
    ));
  }, [activeSnackbars]);

  return (
    <>
      {activeSnackbarsComponents}
    </>
  );
};

export default Snackbars;

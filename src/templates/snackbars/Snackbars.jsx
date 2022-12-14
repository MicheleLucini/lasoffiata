import React, { useMemo } from "react";
import { useSnackbars } from "@contexts/SnackbarsContext";
import Snackbar from './Snackbar';

const Snackbars = () => {
  const { activeSnackbars } = useSnackbars();

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

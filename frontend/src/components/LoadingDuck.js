// src/components/LoadingDuck.js
import React from "react";
import loadingDuck from "../assets/loadingDuck.gif";
import Backdrop from "@mui/material/Backdrop";

const LoadingDuck = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true} // Always open to show the loading duck
    >
      <img src={loadingDuck} style={{ width: "50%" }} alt="Loading..." />
    </Backdrop>
  );
};

export default LoadingDuck;

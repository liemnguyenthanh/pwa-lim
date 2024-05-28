import { CircularProgress, Modal, Stack } from "@mui/material";
import React from "react";

export const WaitingModal = () => {
  return (
    <Modal open={true} onClose={() => {}}>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          width: "100%",
          maxWidth: 373,
          p: 2.5,
          border: 1,
          borderRadius: "10px",
          gap: 2.5,
        }}
      >
        <Stack gap={2} justifyContent="center" alignItems="center">
          <CircularProgress size={40} />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 mt-3">
            Waiting to use DApp
          </h3>
        </Stack>
      </Stack>
    </Modal>
  );
};

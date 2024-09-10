import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AdaptiveCalendar from "../AdaptiveCalendar";

const RoomCalendar = ({ roomId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpenModal} className="open-calendar-btn">
        Открыть календарь
      </button>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="calendar-modal"
        className="calendar-modal"
      >
        <Box className="modal-content">
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            className="close-btn"
          >
            <CloseIcon />
          </IconButton>
          <AdaptiveCalendar roomId={roomId} />
        </Box>
      </Modal>
    </>
  );
};

export default RoomCalendar;

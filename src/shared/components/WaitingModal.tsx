import { Modal, Spinner } from "flowbite-react";
import React from "react";

export const WaitingModal = () => {
  return (
    <Modal show={true} size="md" onClose={() => {}} popup>
      <Modal.Body className="p-5">
        <div className="text-center">
          <Spinner aria-label="Extra large spinner example" size="xl" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 mt-3">
            Waiting to use DApp
          </h3>
        </div>
      </Modal.Body>
    </Modal>
  );
};

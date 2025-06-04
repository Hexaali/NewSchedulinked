"use client";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";


export default function ModalButtonForm({ open, handleOpen, children }) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="md"
      className="bg-transparent shadow-none"
    >
      <DialogBody className="p-0">
        <div className="bg-gradient-light dark:bg-gradient-dark rounded-3xl p-8 shadow-2xl">
          {children}
        </div>
      </DialogBody>
    </Dialog>
  );
}

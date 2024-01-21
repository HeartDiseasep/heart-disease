import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { Button } from "../button";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  content: { message: string; percentage: number };
};

const Dialogue = ({ open, setOpen, content }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Prediction for patient is:</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="text-lg text-neutral-700">{content.message}</div>
            <div className="text-lg text-neutral-700">
              Percentage : {(content.percentage * 100).toFixed(2)}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialogue;

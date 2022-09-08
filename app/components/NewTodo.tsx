import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

export default function NewTodo(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Todo</DialogTitle>
    </Dialog>
  )
}

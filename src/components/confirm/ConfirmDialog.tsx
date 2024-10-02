import Dialog from '@/components/confirm/Dialog';
import Button from '@/components/confirm/Button';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}

export default function ConfirmDialog(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="py-2">{children}</div>
      <div className="flex justify-end gap-3 pt-2 pr-2">
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => onClose()}
          className="!bg-[#d23737]"
        >
          No
        </Button>
      </div>
    </Dialog>
  );
}
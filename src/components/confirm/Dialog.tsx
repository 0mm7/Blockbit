import ExitIcon from '@/components/confirm/ExitIcon';
import IconButton from '@/components/confirm/IconButton';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}

export default function Dialog(props: Props) {
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex bg-[#00000080]">
      <div className="relative p-6 bg-[#171717] text-white w-full max-w-md m-auto
        flex-col flex rounded-lg top-[calc(-50%+170px)]"
      >
        <div>{props.children}</div>
        <span className="absolute top-0 right-0 p-4">
          <IconButton onClick={() => onClose()}>
            <ExitIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
}
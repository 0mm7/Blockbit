interface ModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
  onClose: () => void;
}

interface CloseTradeModalProps extends ModalProps {
  loadOpenTrades: () => void;
}


export interface ModalProps {
  variant: 'center' | 'aside';
  width: number;
  withCloseIcon: boolean;
  isOpen: boolean;
  onClose: () => void;
  renderLink?: (...args: any[]) => JSX.Element;
  renderContent: (modal: { close: () => void }) => JSX.Element
}
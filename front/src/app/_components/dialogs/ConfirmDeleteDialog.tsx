'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import Icon from '@/app/_design/Icon';

interface ConfirmDeleteDialogProps {
  componentName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function ConfirmDeleteDialog({
  componentName,
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading = false,
  error = null,
}: ConfirmDeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="exclamation-triangle" size="m" className="text-warning" />
                Delete Component
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-foreground-600">
                Are you sure you want to delete
                {' '}
                <span className="font-semibold text-foreground">{componentName}</span>
                ?
              </p>
              <p className="text-small text-foreground-500">
                This action cannot be undone. The component and all its versions will be
                permanently removed.
              </p>
              {error && (
                <div className="mt-3 p-3 bg-danger-50 border border-danger-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="exclamation-circle" size="xs" className="text-danger" />
                    <span className="text-small text-danger">{error}</span>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleConfirm}
                isLoading={isLoading}
                startContent={!isLoading ? <Icon icon="trash" size="xs" /> : undefined}
              >
                {isLoading ? 'Deleting...' : 'Delete Component'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// Hook for easier usage
export function useConfirmDeleteDialog() {
  const {
    isOpen, onOpen, onOpenChange, onClose,
  } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onOpenChange,
    onClose,
  };
}

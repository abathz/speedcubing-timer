import * as React from 'react';

type DisclosureReturnType = [boolean, { open: () => void; close: () => void; toggle: () => void }];

const useDisclosure = (value?: boolean): DisclosureReturnType => {
    const [open, setOpen] = React.useState(Boolean(value));

    const _onOpen = React.useCallback(() => setOpen(true), []);
    const _onClose = React.useCallback(() => setOpen(false), []);
    const _onToggle = React.useCallback(() => setOpen((prev) => !prev), []);

    return [open, { open: _onOpen, close: _onClose, toggle: _onToggle }];
};

export { useDisclosure };

import React from 'react';


interface DialogProps {
    open: boolean;
    onOpenChange: () => void;
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onOpenChange}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 max-w-md w-full">{children}</div>
        </div>
    );
};

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

export const DialogContent: React.FC<DialogContentProps> = ({ 
    children, 
    className = "" 
}) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="border-b pb-4 mb-4">{children}</div>;
};

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2 className="text-lg font-medium">{children}</h2>;
};

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="mt-4 flex justify-end space-x-2">{children}</div>;
};

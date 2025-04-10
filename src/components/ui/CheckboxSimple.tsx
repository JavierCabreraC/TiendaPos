interface CheckboxSimpleProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export const CheckboxSimple: React.FC<CheckboxSimpleProps> = ({ 
    checked, 
    onCheckedChange,
    className = ''
}) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        />
    );
};

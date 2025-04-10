interface CustomCheckboxProps {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ 
    id, 
    checked, 
    onCheckedChange,
    label 
}) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label 
                htmlFor={id}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>
        </div>
    );
};

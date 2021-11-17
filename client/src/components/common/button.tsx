import { FC } from 'react';
import './button.scss'

export interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button className="button" onClick={ onClick }>
            { label }
        </button>
    )
}
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './chart-box.scss'

export interface ChartBoxProps {
    title: string;
    variant: string;
}

export const ChartBox: FC<ChartBoxProps> = ({ title, variant }) => {
    return (
        <div className={ `chart-box chart-box-${variant}` }>
            <div className="title">
                Chart Box - { title }
            </div>
            <div className="content">
                chart content
            </div>
            <div className="footer">
                <Link to={ `${variant}` }>show</Link>
            </div>
        </div>
    )
}
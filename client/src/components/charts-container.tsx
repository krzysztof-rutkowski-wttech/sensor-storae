import { FC } from 'react';
import './charts-container.scss'

interface ChartBoxContainerProps {
    children: React.ReactNode;
}

export const ChartsContainer: FC<ChartBoxContainerProps> = ({ children }) => {
    return (
        <div className='charts-container'>
            { children }
        </div>
    )
}

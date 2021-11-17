import { FC } from 'react';
import { ChartsContainer } from '../components/charts-container';
import { ChartBox } from '../components/chart-box';

export const ChartsPage: FC = () => {
  return (
    <>
      <h2>Charts</h2>;
      <ChartsContainer>
        <ChartBox title="Example 1" variant='1'/>
        <ChartBox title="Example 2" variant='2'/>
        <ChartBox title="Example 3" variant='3'/>
      </ChartsContainer>
    </>
  )
}
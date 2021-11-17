import { SensorEntry } from './types';

export const mockedData: SensorEntry[] = [
    { sensorId: 'sensor-2', type: 'TEMP', data: { value: 10.5, timestamp: '2021-11-01 15:32:00' } },
    { sensorId: 'sensor-2', type: 'TEMP', data: { value: 4.5, timestamp: '2021-11-02 15:40:00' } },
    { sensorId: 'sensor-3', type: 'TEMP', data: { value: 17.5, timestamp: '2021-11-05 17:20:00' } },
];

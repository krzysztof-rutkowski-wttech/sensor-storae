import { SensorEntry } from './types';
import { mockedData } from './__mocks__';

interface LookupQueryProps {
    sensorId: string;
}

type GetDataFunction = (params: LookupQueryProps) => Promise<SensorEntry[]>;

const apiMockGet = async (query: LookupQueryProps) => {
    const filtered: SensorEntry[] = mockedData.filter( entry => entry.sensorId === query.sensorId);

    return Promise.resolve(filtered);
}

export const getData: GetDataFunction = async (params) => {
    const result = await apiMockGet(params);

    return result;
}

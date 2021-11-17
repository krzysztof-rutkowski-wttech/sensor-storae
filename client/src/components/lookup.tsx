import { useCallback, useState } from 'react';
import { Button } from './common/button';
import { Select } from './common/select';
import { getData } from '../services/lookup-service';
import { SensorEntry } from '../services/types';
import './lookup.scss';

interface OptionData {
  value: string;
  label: string;
}

export const Lookup = () => {
  const [ selectedOption, setSelectedOption ] = useState<OptionData>();
  const [ lookupResult, setLookupResult ] = useState<SensorEntry[]>();
  const handleSelectOption = useCallback( (selected: OptionData) => {
      setSelectedOption(selected);
  }, []);

  const handleFindClick = async () => {
    if (selectedOption) {
      const data: SensorEntry[] = await getData({ sensorId: selectedOption.value });

      setLookupResult(data);
    }
  }

  const options = [
    { value: 'sensor-1', label: 'Temperature Sensor' },
    { value: 'sensor-2', label: 'Camera Capture' },
    { value: 'sensor-3', label: 'Another Sensor' },
  ];

  return (
    <>
      <div className="lookup-container">
        <div className="filter">
            <Select options={ options } value={ selectedOption } onSelectOption={ handleSelectOption }/>
            <Button label="Find" onClick={ handleFindClick }/>
        </div>
      </div>
      { lookupResult?.length &&
        <div className="lookup-results">
          { lookupResult?.map((entry) => <div>{ entry.data.timestamp }</div>) }
        </div>
      }
    </>
  )
}
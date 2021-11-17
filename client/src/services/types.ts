interface AllSensorsData {
    timestamp: string;
}

interface TempSensorData extends AllSensorsData {
    value: number;
}

interface CameraCaptureData extends AllSensorsData {
    imagePath: string;
}

export interface SensorEntry {
    sensorId: string;
    type: string;
    data: TempSensorData | CameraCaptureData;
}

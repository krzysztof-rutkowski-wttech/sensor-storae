# Sensor Record Storage

Welcome to sensor data storage project!

## Prerequisites
* `NodeJS`
* `Docker` / `docker-compose`

## Installation & Running

  Run command:
  ```
  $ npm install
  ```

  To start **mongodb** and **express-mongodb** on containers run:
  ```
  $ docker-compose up
  ```

  To start REST server change directory to **server/express-rest-server** and run: 
  ```
  $ node server.js
  ```
  REST server will be listening on port **3000**

## Database management

  Go to: <http://localhost:8081/>
  then select `iot` database.

## API Endpoints ##
- - - 
  ### **POST** `/` _(root)_ - Store data record.
  Body (text/JSON):
  ```
  {
      "sensor": <sensor/device name>
      "type": <sensor type>
      "data": { 
        <any data to store>
      }
  }
  ```
  Reponse:
  ```
  {
    "status": "OK"
  }
  ```
  Or (in case of failing):
  ```
  {
      "status": "ERROR",
      "error": <error message>
  }
  ```
- - - 
  ### **GET** `/records/:device` - Get all records for `device` name
  Response:
  ```
  {
      "status": "OK",
      "device": <device name>,
      "records": [
          < recorded data 1>,
          < recorded data 2>,
          ...
      ]
  }
  ```
  When there's no recorded data for the device:
  ```
  {
      "status": "ERROR",
      "error": "NO DEVICE",
      "device": <device name>
  }
  ```
  Or (in case of failing):
  ```
  {
      "status": "ERROR",
      "error": <error message>
  }
  ```

- - - 

## ESP8266 - client
...
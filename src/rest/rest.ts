import { addLog } from "../utils";

const fetch = require('node-fetch');

export type LightStatus = 'on' | 'off';

export const toggleLights: (status: LightStatus) => Promise<Response | undefined> = async (status) => {
  try {
    const response = await fetch('https://api.iot.yandex.net/v1.0/devices/actions', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${process.env.YANDEX_TOKEN}`,
      },
      body: JSON.stringify(
        {
          "devices": [
            {
              "id": "48f0b700-7255-4c82-9a4d-1c738760f31b",
              "actions": [
                {
                  "type": "devices.capabilities.on_off",
                  "state": {
                    "instance": "on",
                    "value": status === 'on' ? true : false
                  }
                }
              ]
            }
          ]
        }
      )
    }) as Response;
    addLog("SUCCESS");
    console.log(response)
    return response;
  } catch (error) {
    addLog('ERROR');
    console.log(error);
  }
};

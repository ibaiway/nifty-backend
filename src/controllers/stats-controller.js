import fetch from 'node-fetch';
import config from '../config/config.js';
import TrackModel from '../models/track-model.js';

const url = `${config.api.URL}/api/countplaybacks`;
const headers = {
  'x-api-token': config.api.KEY
};

function createUpdates(trackId, total) {
  const updates = [];

  for (let i in trackId) {
    const opUpdate = {
      updateOne: {
        filter: { _id: trackId[i] },
        update: { count: total[i] }
      }
    };
    updates.push(opUpdate);
    i++;
  }
  return updates;
}

export default async function callStats() {
  try {
    const response = await fetch(url, { method: 'GET', headers: headers });
    const trackArray = await response.json();
    const dataArray = trackArray.data;
    const trackId = [];
    const total = [];
    dataArray.map(function (element) {
      trackId.push(element.trackId);
      total.push(element.total);
    });
    const operation = createUpdates(trackId, total);

    TrackModel.bulkWrite(operation);
  } catch (error) {
    console.log(error);
  }
}

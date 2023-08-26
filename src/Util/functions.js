export function msToMinutesAndSeconds(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime;
}


export function getSeeds(array) {
  let seeds = [];
  if (array) {
    for (const obj of array) {
      seeds.push(obj.id);
    }
  }
  return seeds.join(",");
}

export function getIds(array) {
  let ids = [];
  if (array) {
    for (const track of array) {
      ids.push(track.track.id);
    }
  }
  return ids.join(",");
}

export function convertKey(key) {
  const notation = [
    "C",
    "C♯/ D♭",
    "D",
    "D♯/ E♭",
    "E",
    "F",
    "F♯/ G♭",
    "G",
    "G♯/ A♭",
    "A",
    "A♯/ B♭",
    "B",
  ];
  const keyHTML = key % 11;
  return notation[keyHTML];
}

export function getFeaturesAverage(object) {
  const sumObject = {
    acousticness: 0,
    danceability: 0,
    energy: 0,
    instrumentalness: 0,
    liveness: 0,
    speechiness: 0,
    valence: 0,
  };

  if (object) {
    object?.forEach((feature) => {
      if (feature) {
        for (const key in sumObject) {
          sumObject[key] += feature[key];
        }
      }
    });
  }

  const totalFeatures = object?.length || 0;

  const averageObject = {};
  for (const key in sumObject) {
    averageObject[key] = totalFeatures ? sumObject[key] / totalFeatures : 0;
  }

  return averageObject;
}

export function getPlaylistDuration(array) {
  let duration = 0;
  array.tracks?.items.forEach((track) => (duration += track.track.duration_ms));
  return duration;
}

export const chartColors = [
  [
    "rgba(171,94,7,1)",
    "rgba(0,54,255,1)",
    "rgba(229,245,31,1)",
    "rgba(123,123,121,1)",
    "rgba(255,128,0,1)",
    "rgba(58,255,0,1)",
    "rgba(151,0,255,1 )",
  ],
  [
    "rgba(171,94,7,0.6)",
    "rgba(0,54,255,0.6)",
    "rgba(229,245,31,0.6)",
    "rgba(123,123,121,0.6)",
    "rgba(255,128,0,0.6)",
    "rgba(58,255,0,0.6)",
    "rgba(151,0,255,0.6)",
  ],
];

export const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      display: false,
    },
    x: {
      ticks: {
        color: "rgba(252, 246, 245, 1)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function shortenFollowers(followers) {
  if (followers >= 1000000) {
    return (followers / 1000000).toFixed(1) + "M";
  } else if (followers >= 1000) {
    return (followers / 1000).toFixed(1) + "K";
  } else {
    return followers.toString();
  }
}

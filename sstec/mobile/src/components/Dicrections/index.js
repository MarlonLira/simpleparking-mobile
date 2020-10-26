import React from 'react';

import MapDicrections from 'react-native-maps-directions';

const Dicrections = ({ destination, origin, onReady }) => {
  return <MapDicrections 
    destination={ destination }
    origin={origin}
    apikey="AIzaSyBrGTfBFa0mZ9303uZOuvW-xYxHXtHRs2k"
    strokeWidth={3}
    strokeColor="#59578e"
  />;
}

export default Dicrections;
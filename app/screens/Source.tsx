import React, {useState} from 'react';
import ImageGrid from '../components/ImageGrid/imageGrid';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

const imageURL = require('../assets/images/test.jpg');

const Source = () => {
  const [topExpansion, setTopExpansion] = useState(0);
  const [bottomExpansion, setBottomExpansion] = useState(0);
  const [leftExpansion, setLeftExpansion] = useState(0);
  const [rightExpansion, setRightExpansion] = useState(0);

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 24, gap: 24}}>
      <ImageGrid
        source={imageURL}
        expansion={{
          top: topExpansion,
          bottom: bottomExpansion,
          left: leftExpansion,
          right: rightExpansion,
        }}
      />
      <View>
        <Text>Top</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={topExpansion}
          onValueChange={setTopExpansion}
          minimumTrackTintColor="#0066FF"
          maximumTrackTintColor="#000000"
        />
        <Text>Bottom</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={bottomExpansion}
          onValueChange={setBottomExpansion}
          minimumTrackTintColor="#0066FF"
          maximumTrackTintColor="#000000"
        />
        <Text>Left</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={leftExpansion}
          onValueChange={setLeftExpansion}
          minimumTrackTintColor="#0066FF"
          maximumTrackTintColor="#000000"
        />
        <Text>Right</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={rightExpansion}
          onValueChange={setRightExpansion}
          minimumTrackTintColor="#0066FF"
          maximumTrackTintColor="#000000"
        />
      </View>
    </View>
  );
};

export default Source;

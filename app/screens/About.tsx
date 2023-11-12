import React, {useState} from 'react';
import TitleBar from '../components/TitleBar/TitleBar';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useModal} from 'react-native-modal-provider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const About = () => {
  const {closeModal} = useModal();
  const safeAreaInsets = useSafeAreaInsets();

  const title = 'Share to Socials';
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate, est quis varius dapibus, ex mi rhoncus metus, ut ornare sapien odio vel risus. Nulla dignissim, mauris et placerat eleifend, enim erat elementum est, quis accumsan velit est in turpis. Donec feugiat odio at hendrerit tempus. Curabitur vestibulum imperdiet nibh ut rhoncus. Mauris vitae risus ipsum. Nunc feugiat viverra mi vel rutrum. Maecenas vel mauris consequat, vestibulum libero sit amet, tempor neque. Ut eu quam odio. Cras feugiat urna leo, non bibendum nibh commodo a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut a consectetur leo. Mauris nec dapibus nisl. Vivamus maximus in ante vel egestas. Duis ante elit, bibendum nec nunc vel, iaculis semper arcu. Nunc vulputate finibus ullamcorper. Praesent quam velit, malesuada volutpat sollicitudin eu, placerat a elit.\n\nQuisque in finibus ex, sed hendrerit ante. Phasellus laoreet elit vel auctor sagittis. Ut quis erat sit amet magna lacinia viverra quis ut sem. Etiam at mauris eget risus dignissim dictum. Etiam venenatis blandit turpis ut dictum. Maecenas faucibus ante nec risus porttitor ultrices. Etiam blandit nec libero ut gravida. In vehicula ante a convallis tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris cursus arcu vel sollicitudin tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis elementum, turpis a vulputate scelerisque, augue lorem tempus orci, sit amet dictum ipsum diam in quam. In hac habitasse platea dictumst. Ut feugiat mollis justo et aliquam. Fusce dapibus massa arcu, a placerat libero pretium sed.\n\nNam diam magna, iaculis a maximus vel, placerat sed felis. Vivamus lobortis elit ipsum, id tempor odio bibendum nec. Aenean faucibus urna sit amet nisi faucibus vestibulum. Etiam eget neque libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ultrices, nisi quis aliquam pulvinar, lorem augue fringilla sapien, ac auctor eros lectus in massa. Duis vehicula, est rhoncus finibus maximus, sem orci hendrerit justo, at sodales tortor odio in odio. Nam quis neque egestas tortor mattis rhoncus in vitae massa. In hac habitasse platea dictumst. Cras non lorem non dui pulvinar feugiat. Integer purus arcu, dictum et est non, laoreet lacinia ligula. Praesent faucibus auctor odio, ac facilisis tellus sodales feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem felis, venenatis posuere mi ut, mollis pharetra lorem. Praesent nec ullamcorper libero.\n\nProin imperdiet ante nec dui fermentum, in dictum turpis malesuada. Sed tincidunt, lectus molestie dignissim commodo, diam turpis congue nisl, ut scelerisque quam mauris eget ex. Donec ante mi, placerat vitae elementum eu, dictum sit amet augue. Nulla ornare pretium mauris, ac facilisis massa blandit non. Sed vel dolor sit amet lacus finibus fermentum. Ut efficitur dapibus urna, eu imperdiet lorem blandit sed. Vestibulum tristique, orci ut fermentum tempor, felis elit tristique quam, a condimentum turpis magna quis sapien. Aliquam vestibulum urna eget ligula hendrerit, non consectetur mi pretium. Quisque vulputate, elit et vestibulum laoreet, justo sem sodales justo, vitae lacinia tellus tellus vitae nunc. Nulla ornare, libero id tincidunt feugiat, nulla dui sagittis nisl, non facilisis libero ante vel turpis. Cras diam eros, rutrum sit amet egestas vitae, ultricies consectetur magna. Vestibulum ultrices mauris vel nisl vehicula, nec semper nunc varius. Duis tempus non libero sed tincidunt.\n\nDonec nec pharetra nisi. Praesent ultricies urna quis tempus convallis. Curabitur consectetur consectetur massa, vitae mollis urna. Mauris vel neque malesuada nunc maximus sagittis. Sed metus sem, tincidunt nec purus id, accumsan finibus mauris. Suspendisse potenti. Maecenas nec dui varius, viverra massa at, interdum arcu.';

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: number}}}) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  return (
    <TitleBar
      backgroundColor="white"
      cancellationNode={
        <TouchableOpacity onPress={closeModal}>
          <Text style={{fontWeight: '600', color: '#0066FF'}}>Close</Text>
        </TouchableOpacity>
      }
      confirmationNode={
        <TouchableOpacity>
          <Text style={{fontWeight: '600', color: '#0066FF'}}>Review</Text>
        </TouchableOpacity>
      }
      detent="medium">
      <View
        style={{
          height: 1,
          backgroundColor: 'rgb(200, 200, 200)',
          opacity: isScrolled ? 1 : 0,
        }}
      />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: safeAreaInsets.bottom
              ? safeAreaInsets.bottom + 12
              : 24,
            gap: 24,
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 36,
              fontWeight: '600',
            }}>
            {title}
          </Text>
          <Text
            style={{
              flex: 1,
            }}>
            {text}
          </Text>
        </View>
      </ScrollView>
    </TitleBar>
  );
};

export default About;

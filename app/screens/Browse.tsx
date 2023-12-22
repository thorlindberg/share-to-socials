import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import handleImagePicker from '../handlers/handleImagePicker';
import {Icon} from '@rneui/themed';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Composite from '../components/Composite/composite';
import data from '../assets/json/presets.json';

const Browse = ({
  selectedImage,
  setSelectedItem,
  setSelectedImage,
}: {
  selectedImage: ImageSourcePropType;
  setSelectedItem: (item: any) => void;
  setSelectedImage: (value: boolean) => void;
}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const rowCount = 3;

  const [menuHeight, setMenuHeight] = useState(0);
  const [paddingHeight, setPaddingHeight] = useState(0);
  React.useEffect(() => {
    if (menuHeight > paddingHeight) {
      setPaddingHeight(menuHeight);
    }
  }, [menuHeight, paddingHeight]);

  const presets = (
    <View
      style={{
        paddingTop: 10,
        gap: 24,
        paddingBottom: safeAreaInsets.bottom ? safeAreaInsets.bottom : 24,
      }}>
      {Object.entries(data).map(([category, items]) => (
        <View key={category} style={{gap: 16}}>
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 20,
            }}>
            {category}
          </Text>
          <ScrollView
            onLayout={event => setWidth(event.nativeEvent.layout.width)}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 20,
                gap: 16,
                flexDirection: 'row',
              }}>
              {items.map((_, index) => {
                const item = items[index];

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.5}
                    disabled={!selectedImage}
                    style={{
                      width: (width - rowCount * 18) / (rowCount - 1 + 1 / 3),
                      overflow: 'hidden',
                      borderRadius: 8,
                      borderWidth: 3,
                      borderColor: 'rgb(230, 230, 230)',
                    }}
                    onPress={() => {
                      setSelectedItem(item);
                    }}>
                    <Composite
                      selectedImage={selectedImage}
                      backgroundColor={item.backgroundColor}
                      background={item.background}
                      initialPadding={item.scale}
                      initialHorizontal={item.alignment.horizontal}
                      initialVertical={item.alignment.vertical}
                      initialInsetLeft={item.inset.left}
                      initialInsetRight={item.inset.right}
                      initialInsetTop={item.inset.top}
                      initialInsetBottom={item.inset.bottom}
                      initialTopExpansion={item.expansion.top}
                      initialBottomExpansion={item.expansion.bottom}
                      initialLeftExpansion={item.expansion.left}
                      initialRightExpansion={item.expansion.right}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      ))}
    </View>
  );

  const imageButton = (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        handleImagePicker(image => {
          setSelectedImage(image);
        });
      }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 1000,
          borderWidth: 1,
          borderColor: 'rgb(220, 220, 220)',
          backgroundColor: 'white',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={selectedImage}
            style={{
              width: 48,
              height: 48,
              borderRadius: 1000,
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            borderWidth: 1,
            borderRadius: 1000,
            borderColor: 'rgb(220, 220, 220)',
            backgroundColor: 'white',
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#0066FF',
              borderRadius: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="plus" type="font-awesome" size={12} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // when scrolling down, the top menu should be minimized to just a small "Compose" and when pulled up it should be expanded?
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
    <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
      {!isScrolled && (
        <View
          onLayout={event => setMenuHeight(event.nativeEvent.layout.height)}
          style={{
            paddingTop: safeAreaInsets.top,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '600',
            }}>
            Compose
          </Text>
          {imageButton}
        </View>
      )}
      {isScrolled && (
        <TouchableOpacity onPress={() => setIsScrolled(false)}>
          <View
            style={{
              paddingTop: safeAreaInsets.top,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
              }}>
              Compose
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {isScrolled && (
        <View style={{height: 1, backgroundColor: 'rgb(200, 200, 200)'}} />
      )}
      <ScrollView
        style={{flex: 1}}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {presets}
      </ScrollView>
    </View>
  );
};

export default Browse;

import { View, TouchableOpacity, Animated } from 'react-native';
import React, { useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const icons = {
  Home: 'home',
  Search: 'search',
  Favourite: 'star',
 
};

const CustomTabBar = ({ state, navigation }) => {
  const animatedValues = useRef(state.routes.map(() => new Animated.Value(0))).current;

  const handlePress = (index, routeName) => {
    animatedValues.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === index ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    navigation.navigate(routeName);
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((item, index) => {
        const backgroundColor = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['#39406b', 'black'],
        });

        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10], 
        });

        return (
          <TouchableOpacity 
            key={item.key} 
            style={styles.tabButton} 
            onPress={() => handlePress(index, item.name)}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                { backgroundColor, transform: [{ translateY }] }
              ]}
            >
              <FontAwesome5  name={icons[item.name]} size={25} color="white" />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10, 
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    width: '80%',
    height: 70, 
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30, 
    position: 'absolute',
    bottom: 15,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6, 
  },
  iconContainer: { 
    padding:6,
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default CustomTabBar;

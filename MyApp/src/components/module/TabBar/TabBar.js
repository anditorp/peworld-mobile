// TabBar.js
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {IconHome, IconSearch} from '../../../../assets/icons/index';

export default function TabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const IconComponent = () => {
          if (label === 'Home')
            return <IconHome stroke={isFocused ? '#673ab7' : '#222'} />;
          if (label === 'Search')
            return <IconSearch stroke={isFocused ? '#673ab7' : '#222'} />;
          return null; // Return null as a fallback
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <IconComponent />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    elevation: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});

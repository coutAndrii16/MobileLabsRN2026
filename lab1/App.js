import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/ GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <SafeAreaView style={{flex:1}} edges={['top', 'right', 'bottom', 'left']}>
        <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarShowIcon: true,
              tabBarIcon: ({ focused }) => {
                let iconName;
                switch (route.name) {
                  case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                  case 'Gallery':
                    iconName = focused ? 'images' : 'image-outline';
                    break;
                  case 'Profile':
                    iconName = focused ? 'person' : 'person-outline';
                    break;
                  default:
                    iconName = 'help-circle- outline';
                    break;
                }

                return <Ionicons name={iconName} size={22} />;
              },
              tabBarIndicatorStyle: { backgroundColor: '#00ffcc' },
              tabBarStyle: { backgroundColor: '#1e1e1e' },
              tabBarActiveTintColor: '#fff',
              tabBarInactiveTintColor: '#aaa',
              tabBarLabelStyle: { fontSize: 11 },
            })}
        >
          <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Головна' }}
          />
          <Tab.Screen
              name="Gallery"
              component={GalleryScreen}
              options={{ title: 'Фотогалерея' }}
          />
          <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Профіль' }}
          />

        </Tab.Navigator>
              <View
                  style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: '#84846c',
                      paddingVertical: 10,
                      alignItems: 'center',
                  }}
              >
                  <Text style={{ color: '#fff', fontSize: 13 }}>
                      Майданович Андрій Вячеславович, ІПЗ-24-2
                  </Text>
              </View>
          </SafeAreaView>
      </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

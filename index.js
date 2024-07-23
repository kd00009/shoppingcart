// index.js
import { AppRegistry } from 'react-native';
import AppWrapper from './App'; // Ensure the path is correct
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);

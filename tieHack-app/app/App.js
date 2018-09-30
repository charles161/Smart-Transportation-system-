import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Ride from './screens/Ride';
import Wallet from './screens/Wallet';

Navigation.registerComponent('Ride', () => Ride,store,Provider);
Navigation.registerComponent('Wallet', () => Wallet, store, Provider);

export default async function () {
  if (true) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Wallet',
          screen: 'Wallet', // this is a registered name for a screen
          icon: require('./img/icon1.png'),
          title: 'Wallet'
        },
        {
          label: 'Ride',
          screen: 'Ride',
          icon: require('./img/icon1.png'),
          title: 'Ride'
        }
      ],
      tabsStyle: {
        tabBarBackgroundColor: '#2f6a6d',
        tabBarButtonColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        tabFontFamily: 'BioRhyme-Bold',
      },
      appStyle: {
        navBarTextColor:'#ffffff',
        navBarTitleTextCentered: true,
        tabBarBackgroundColor: '#2f6a6d',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#ffffff99',
        tabBarTextColor:'#ffffff99',
        tabBarSelectedTextColor:'#ffffff',
        tabBarSelectedButtonColor: '#ffffff',
        navigationBarColor: '#2f6a6d',
        navBarBackgroundColor: '#2f6a6d',
        statusBarColor: '#8c241c',
        tabFontFamily: 'BioRhyme-Bold',
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'slide-down'
    });
  }
  else {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Login',
        title:'Welcome...'
      }
    });
  }
}


import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Index from './components/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'start',
      index: 0
    }
  }

  async componentDidMount() {

    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({ status: '' });
    }, 3000);
  }

  render() {
    if (this.state.status == 'start')
      return (<View style={{ flex: 1, backgroundColor: '#212121', alignContent: 'center', justifyContent: 'center', opacity: this.state.logoOpacity }}>
        <Image source={require('./images/logo.png')} style={{ alignSelf: 'center' }} />
      </View >);
    else
      return (<Index />);
  }
}

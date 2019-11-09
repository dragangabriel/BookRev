import React, { Component } from 'react';
import { StackNavigator, SafeAreaView } from 'react-navigation';
import Search from './search';
import Books from './books';

const Index = StackNavigator({
    Search: { screen: Search },
    Books: { screen: Books },
});

export default class App extends React.Component {

    render() {
        return (<Index />);
    }
}
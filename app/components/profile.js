import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import { Tab, Tabs, View, Text, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import Camera from 'react-native-camera';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    static navigationOptions = {
        header: null
    };

    goToPage(newPage) {
        this.props.navigation.navigate(newPage, {});
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#B2DFDB' }}>
                <View style={{ flex: 1 }}>
                    <Text>2 buttons</Text>
                </View>
                <Footer style={{ backgroundColor: '#004D40' }}>
                    <FooterTab style={{ backgroundColor: 'transparent' }}>
                        <Button onPress={() => { this.goToPage('Search') }}>
                            <Icon type="Ionicons" style={{ color: 'white' }} name="ios-search-outline" />
                        </Button>
                    </FooterTab>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button>
                            <Icon type="Ionicons" style={{ color: '#004D40' }} name="ios-person" />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
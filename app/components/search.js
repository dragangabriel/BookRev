import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    AppStore
} from 'react-native';
import { Tab, Tabs, View, Text, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import Camera from 'react-native-camera';

const { height, width } = Dimensions.get('window');
const maskRowHeight = Math.round((height - 300) / 20);
const maskColWidth = (width - 300) / 2;

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    onBarCodeRead = (e) => this.setState({ qrcode: e.data });

    goToPage(newPage) {
        this.props.navigation.navigate(newPage, {});
    }

    async searchByISBN() {
        this.props.navigation.navigate("Books", { isbn: this.state.qrcode });
    }

    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container style={{ backgroundColor: '#81C784' }}>
                <View style={{ flex: 1 }}>
                    <Camera
                        style={styles.preview}
                        onBarCodeRead={this.onBarCodeRead}
                        ref={cam => this.camera = cam}
                        aspect={Camera.constants.Aspect.fill}
                    >
                        <View style={styles.maskOutter}>
                            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                            <View style={[{ flex: 30 }, styles.maskCenter]}>
                                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                                <View style={styles.maskInner} />
                                <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                            </View>
                            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#81C784', bottom: 10, position: 'absolute' }}>
                            <Text style={{ flex: 5, flexDirection: 'row', color: '#212121', textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center' }}>{this.state.qrcode != '' ? this.state.qrcode : 'Scanning ISBN...'}</Text>
                            <Button style={{ flex: 1, backgroundColor: 'white', alignContent: 'center', justifyContent: 'center' }} onPress={() => { this.searchByISBN() }}>
                                <Icon type="Ionicons" style={{ color: '#81C784', alignItems: 'center' }} name="md-send" />
                            </Button>
                        </View>
                    </Camera>
                </View>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
    },
    maskRow: {
        width: '100%',
    },
    maskCenter: { flexDirection: 'row' },
});
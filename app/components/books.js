import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Alert, Linking } from 'react-native';
import { H3, Tab, Tabs, View, Text, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, Subtitle } from 'native-base';
import Api from '../config/api';
import AppConfig from '../config/appConfig';
import StarRating from 'react-native-star-rating';
import { AdMobBanner } from 'react-native-admob';

export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isbn: '',
            result: null,
            notFound: false,
            loading: true
        }
    }

    goToUrl(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => Alert.alert('An error occurred', err));
    }

    async componentDidMount() {
        var isbn = this.props.navigation.state.params.isbn;
        this.setState({ isbn: isbn });
        await Api.getBooksByISBN(isbn)
            .then((response) => response.json())
            .then((responseJson) => {
                if (!responseJson.isSuccess) {
                    Alert.alert(responseJson.message);
                    this.state.notFound = true;
                    this.state.loading = false;
                    this.forceUpdate();
                } else {
                    responseJson = responseJson.results[0];
                    if (responseJson.book != null) {
                        this.state.result = responseJson;
                    } else {
                        this.state.notFound = true;
                    }
                    this.state.loading = false;
                    this.forceUpdate();
                }
            })
            .catch((error) => {
                this.state.notFound = true;
                this.state.loading = false;
                this.forceUpdate();
            });
    }


    _renderHeader = () => {
        return (<CardItem style={{ backgroundColor: 'transparent', alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }} onPress={() => { this.goToUrl("https://idreambooks.com") }}>Critic Reviews from iDreamBooks </Text>
        </CardItem>);
    }

    _renderPost = ({ item, index }) => {
        return (
            <View>
                {
                    index % 3 == 1 ?
                        <AdMobBanner
                            style={{ alignSelf: 'center', backgroundColor: 'transparent' }}
                            adSize="smartBannerPortrait"
                            adUnitID={AppConfig.ads[Math.floor(Math.random() * Math.floor(AppConfig.ads.length))]}
                        />
                        : null
                }
                <Card style={{ marginLeft: 10, marginRight: 10, padding: 10 }}>
                    <CardItem style={{ paddingLeft: 0 }}>
                        <Left>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{item.source}</Text>
                        </Left>
                        <Right>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={item.rating}
                                fullStarColor={'#81C784'}
                                halfStarColor={'#81C784'}
                                starSize={20}
                            />
                        </Right>
                    </CardItem>
                    <Text style={{ fontSize: 12 }}>{item.content}</Text>
                </Card>
            </View>);
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerRight: (
                <Text style={{ paddingRight: 10 }}>ISBN: {params.isbn}</Text>
            ),
        };
    };

    render() {
        return (
            <Container style={{ backgroundColor: '#81C784' }}>
                {
                    this.state.loading == true ?
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator size="large" color="white" />
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        :
                        this.state.notFound == true ?
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'center' }}>Sorry we couldn't find this ISBN in our database</Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                            </View>
                            :
                            <Content>
                                <Card style={{ padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                    <Title style={{ color: 'black' }}>{this.state.result.book.name}</Title>
                                    <Subtitle style={{ color: 'black' }}>by {this.state.result.book.author}</Subtitle>
                                    <CardItem style={{ backgroundColor: 'transparent', paddingLeft: 0 }}>
                                        <Left>
                                            <Text>Genre: {this.state.result.book.genre}</Text>
                                        </Left>
                                        <Right>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Icon name="ios-thumbs-up" style={{ color: 'black' }} />
                                                <Text>{' '}{this.state.result.book.rating}%</Text>
                                            </View>
                                        </Right>
                                    </CardItem>
                                </Card>
                                <View>
                                    <FlatList
                                        data={this.state.result.book.reviews}
                                        renderItem={this._renderPost}
                                        keyExtractor={(item, index) => item.source}
                                        ListHeaderComponent={this._renderHeader}
                                        ListEmptyComponent={() => {
                                            return <View style={{
                                                padding: 20, flex: 1,
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}><Text>No reviews to show :(</Text></View>
                                        }}
                                    />
                                </View>
                            </Content>
                }
            </Container>
        )
    }

}

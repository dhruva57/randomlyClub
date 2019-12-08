import React from 'react';
import { Text, View, FlatList, Picker, Modal, Button, TouchableHighlight } from 'react-native';
import { Card, Icon } from 'react-native-elements';

function Feed(props) {

    const renderPosts = ({ item, index }) => {
        let date = new Date(item.event_date * 1000).toDateString();

        return (
            <Card
                image={{ uri: item.thumbnail_image }}
                key={index}>
                <Text style={{ fontWeight: 'bold' }}>
                    {item.event_name}
                </Text>
                <Text>
                    {date}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        raised
                        reverse
                        name='thumbs-up'
                        type='font-awesome'
                        color='#739c1a'
                        size={12}
                    />
                    <Text style={{marginTop : 10}}>
                        {item.likes} likes
                    </Text>
                    <Icon
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#739c1a'
                        size={12}
                    />
                    <Text style={{marginTop : 10}}>
                        {item.shares} shares
                    </Text>
                    <Icon
                        raised
                        reverse
                        name='eye'
                        type='font-awesome'
                        color='#739c1a'
                        size={12}
                    />
                    <Text style={{marginTop : 10}}>
                        {item.views} views
                    </Text>
                </View>
            </Card>
        );
    };

    return (
        <View style ={{marginBottom : 100}}>
            <View style={{ flexDirection: 'row', marginTop: 20,marginLeft : 10 }}>
                <Icon
                    raised
                    reverse
                    name='arrow-left'
                    type='font-awesome'
                    size={12}
                    onPress={() => props.onPageChange(props.data.page - 1)}
                />
                <Text style={{marginTop : 10}}>
                    {props.data.page}
                </Text>
                <Icon
                    raised
                    reverse
                    name='arrow-right'
                    type='font-awesome'
                    size={12}
                    onPress={() => props.onPageChange(props.data.page + 1)}
                />
                <Picker
                    selectedValue={props.sortBy}
                    style={{height: 50, width: 200}}
                    onValueChange={(itemValue, _) => props.handleSorting(itemValue)}>
                    <Picker.Item label={'Date'} value={'event_date'} />
                    <Picker.Item label={'Likes'} value={'likes'} />
                    <Picker.Item label={'Views'} value={'views'} />
                    <Picker.Item label={'Shares'} value={'shares'} />
                </Picker>
                <Icon
                    raised
                    reverse
                    name= {props.ascending > 0 ? 'arrow-down' : 'arrow-up'}
                    type='font-awesome'
                    size={12}
                    onPress={() => props.handleAscend()}
                />
            </View>
            <FlatList
                data={props.data.posts}
                renderItem={renderPosts}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}


export default Feed;
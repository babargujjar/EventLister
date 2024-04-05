import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import search from '../../../assets/images/Search.png';
import Card from '../../../components/card/Card';
import {ItemEvent} from '../../../constant/types';
import MyPostingStyle from './MyPostingStyle';
import useMyPosting from '../../../hooks/useMyPosting';

const MyPosting = ({navigation}: any) => {
  const renderEventCard = ({item}: ItemEvent) => {
    // console.log('item', item)
    return userEvents ? (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('EditEvent', {param: item});
        }}>
        <Card param={item} />
      </TouchableOpacity>
    ) : (
      <Text style={MyPostingStyle.message}>
        You haven't created any events yet. Get started by creating your first
        event!
      </Text>
    );
  };

  const {userEvents, loading}: any = useMyPosting();

  return (
    <FlatList
      data={userEvents}
      ListHeaderComponent={() => (
        <View style={MyPostingStyle.container2}>
          <Text style={MyPostingStyle.heading}>My Event Postings</Text>
          <View style={MyPostingStyle.inputview}>
            <Image style={{height: 24, width: 24}} source={search} />
            <Text style={{color: '#171B2E'}}>search...</Text>
          </View>
        </View>
      )}
      renderItem={renderEventCard}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            color="#6F3DE9"
            style={{marginTop: 20}}
          />
        ) : null
      }
      contentContainerStyle={MyPostingStyle.container}
    />
  );
};

export default MyPosting;

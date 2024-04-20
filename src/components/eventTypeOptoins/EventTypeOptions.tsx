import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CreateEventStyle from '../../screens/createEvent/CreateEventStyle';
import Button from '../button/Button';

const EventTypeOptions = ({prop}:any) => {
    const {options,setEventType, setOptionModel} = prop;
  return (
    <View style={CreateEventStyle.optionModel}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <Button
            onPress={() => {
              setEventType(item);
              setOptionModel(false);
            }}>
            <Text style={CreateEventStyle.optionText}>{item}</Text>
          </Button>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default EventTypeOptions
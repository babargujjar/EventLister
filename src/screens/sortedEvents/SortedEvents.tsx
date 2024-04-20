import React from 'react';
import {View, ScrollView, Image, Text} from 'react-native';
import FilterIcon from '../../assets/images/Filter.png';
import SearchIcon from '../../assets/images/Search.png';
import FilterdEvents from '../../components/filteredEvents/FilteredEvents';
import SortedEventsStyle from './SortedEventsStyle';

const SortedEvents = () => {
  return (
    <ScrollView style={SortedEventsStyle.container}>
      <View style={SortedEventsStyle.content}>
        <View style={SortedEventsStyle.recentEvents}>
          <Text style={SortedEventsStyle.recentEventsText}>Recent Events</Text>
          <Image source={FilterIcon} style={SortedEventsStyle.filterIcon} />
        </View>
        <View style={SortedEventsStyle.searchBar}>
          <Image source={SearchIcon} style={SortedEventsStyle.searchIcon} />
          <Text style={SortedEventsStyle.searchText}>search...</Text>
        </View>
        <Text style={SortedEventsStyle.ongoingEventsText}>Ongoing Events</Text>
        <FilterdEvents />
      </View>
    </ScrollView>
  );
};

export default SortedEvents;

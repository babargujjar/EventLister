import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FilterIcon from '../../../assets/images/Filter.png';
import SearchIcon from '../../../assets/images/Search.png';
import FilterdEvents from '../../../components/filteredEvents/FilteredEvents';

const SortedEvents = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState('Select an option');

  const handleFilterChange = (values: number[], date: Date) => {
    console.log('Price Range:', values);
    console.log('Sorted By Category:', selectedValue);
    console.log('Sorted By Date:', date);
  };

  const handleSelectValue = (value: string) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.recentEvents}>
          <Text style={styles.recentEventsText}>Recent Events</Text>
          <Image source={FilterIcon} style={styles.filterIcon} />
        </View>
        <View style={styles.searchBar}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <Text style={styles.searchText}>search...</Text>
        </View>
        <Text style={styles.ongoingEventsText}>Ongoing Events</Text>
        <FilterdEvents />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 32,
  },
  recentEvents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  recentEventsText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#171B2E',
  },
  filterIcon: {
    width: 22,
    height: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 52,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // transparent background
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchText: {
    color: '#171B2E',
    paddingLeft: 10,
  },
  ongoingEventsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171B2E',
    marginBottom: 20,
  },
});

export default SortedEvents;

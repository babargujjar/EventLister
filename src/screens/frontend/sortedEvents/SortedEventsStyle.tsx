import { StyleSheet } from "react-native";

const SortedEventsStyle = StyleSheet.create({
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
    fontFamily: 'Poppins-Bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchText: {
    color: '#171B2E',
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  ongoingEventsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171B2E',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
});


export default SortedEventsStyle
import { StyleSheet } from "react-native";



const CardStyle = StyleSheet.create({
  map: {
    height: 100,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    padding: 6,
    marginBottom: 15,
  },
  innermap: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  mapcontent: {
    height: 72,
    margin: 8,
    position: 'relative',
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  maptexts: {
    fontSize: 12,
    color: '#9496A5',
    fontWeight: '400',
    lineHeight: 19,
    fontFamily: 'Poppins',
  },
  mapmaintitle: {
    fontSize: 14,
    color: '#171B2E',
    fontWeight: '600',
    lineHeight: 18,
    fontFamily: 'Poppins',
  },
  mapbutton: {
    backgroundColor: '#EFF0F9',
    height: 32,
    borderRadius: 40,
    color: '#6F3DE9',
    textAlign: 'center',
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    fontFamily: 'Poppins',
  },
});


export default CardStyle;
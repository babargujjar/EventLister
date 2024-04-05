import { StyleSheet } from "react-native";

const MyPostingStyle = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container2: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  heading: {
    color: '#171B2E',
    marginTop: 32,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: 'Poppins-Bold',
  },
  inputview: {
    height: 52,
    borderRadius: 26,
    borderColor: '#EAEAED',
    borderWidth: 1,
    marginTop: 43,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    paddingLeft: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
});




export default MyPostingStyle;
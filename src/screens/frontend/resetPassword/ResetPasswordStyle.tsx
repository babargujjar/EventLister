import { StyleSheet } from "react-native";

const ResetPasswordStyle = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  topview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginTop: 32,
    height: 42,
    paddingRight: 120,
    alignItems: 'center',
    marginBottom: 74,
  },
  topviewtext: {
    color: '#171B2E',
    lineHeight: 18,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  topimgview: {
    borderWidth: 1,
    borderColor: '#EFF0F9',
    width: 42,
    height: 42,
    borderRadius: 40,
    padding: 9,
  },
  inputview: {
    height: 82,
    flexDirection: 'column',
    gap: 12,
    marginBottom: 18,
  },
  input: {
    height: 52,
    color: '#171B2E',
    borderRadius: 26,
    backgroundColor: '#F9F9F9',
    paddingLeft: 16,
    fontFamily: 'Poppins-Regular',
  },
  nametext: {
    color: '#171B2E',
    height: 18,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18.2,
    fontFamily: 'Poppins-Bold',
  },
  botton: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#6F3DE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottontext: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins-Bold',
  },
});

export default ResetPasswordStyle;

import {Platform} from 'react-native'
export const colors = {
  snow: 'white',
  card: '#ffffff',
  red: '#E64044',
  redShadow: '#E83E3F',
  silver: '#F3F5F6',
  purple: '#134e5e',
  darkPurple: '#71b280',
  purpleShadow1: '#71b280',
  purpleShadow2: '#B997BC',
  headerPurple: '#134e56',
  avatarBorder: '#DCE3E8',
  lightText: '#656565',
  text: '#000000',
  transparentBump: (Platform.OS === 'ios') ? 'rgba(140,42,140, 0.5)' : 'rgba(140,42,140, 0.9)'
}

export const styles = {
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: colors.card,
    justifyContent: 'center',
    marginBottom: 10
  },
  container: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.headerPurple
  },
  header: {
    height: 60, flexDirection: 'row', paddingTop: 15, paddingBottom: 15, justifyContent: 'center',
    position: 'relative', backgroundColor: colors.headerPurple, alignContent: 'space-around', elevation: 10
  },
  textHeader: { color: colors.lightText, fontStyle: 'italic', fontSize: (Platform.OS === 'ios') ? 13 : 16, padding: 2 },
  textInput: {
    color: colors.headerPurple, fontSize: (Platform.OS === 'ios') ? 13 : 16, fontWeight: 'bold', padding: 8
  },
  linearGrad: [colors.headerPurple, colors.purple, colors.darkPurple]
};
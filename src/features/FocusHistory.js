import React from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import {colors} from '../utils/colors'
import {spacing} from '../utils/sizes'

export const FocusHistory = ({history}) => {
  if (!history || !history.length) return<Text style={{...styles.title,paddingLeft:10}}>We have not focus on anythng yet!</Text> ;

  const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

  return(
    <View style={styles.container}>
    <Text style={styles.title}>The things we've focused on are :</Text>
    <FlatList 
      data={history}
      renderItem={renderItem}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:10,
  },
  item:{
    color: colors.white,
    fontSize: spacing.md,
  },
  title:{
    color: colors.white,
    fontWeight:'bold',
    fontSize: spacing.md,
 },
});
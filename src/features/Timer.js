import React, { useState } from 'react';
import { View, Text, StyleSheet,Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import {Timing} from './Timing'
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';

const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

export const Timer = ({ focusSubject, clearSubject,onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress,setProgress] = useState(1);
  const [minutes,setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ padding: spacing.xxl }}>
          <Text style={styles.text}>Focusing on :</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          visible={true}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingContainer}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton
            title={'Start'}
            onPress={() => {
              setIsStarted(true);
            }}
          />
        )}
        {isStarted && (
          <RoundedButton
            title={'Pause'}
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearWrapper}>
      <RoundedButton size={50} title={'-'} onPress={clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countDown: {
    flex: 0.5,
    paddingTop:spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingContainer : {
    flex:0.1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    paddingTop:spacing.lg ,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    color: colors.white,
    fontSize: spacing.lg,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize: spacing.lg,
    textAlign: 'center',
  },
  clearWrapper:{
    flexDirection:'row',
    justifyContent:'center'
  }
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectDifficulty } from '../redux/features/difficultySlice';

interface TimerProps {
  setStop: (value: boolean) => void;
  questionNumber: number;
}

export const Timer: React.FC<TimerProps> = ({ setStop, questionNumber }: TimerProps) => {
  // const dispatch = useDispatch();
  const selectedDifficulty = useSelector(selectDifficulty);
  const [timer, setTimer] = useState<number>(20); // Default value set to 20 seconds

  useEffect(() => {
    if (selectedDifficulty === 'medium') {
      setTimer(15);
    } else if (selectedDifficulty === 'hard') {
      setTimer(10);
    }
  }, [selectedDifficulty]);

  useEffect(() => {
    if (timer === 0) {
      setStop(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    if (selectedDifficulty === 'low') {
      setTimer(20);
    } else if (selectedDifficulty === 'medium') {
      setTimer(15);
    } else if (selectedDifficulty === 'hard') {
      setTimer(10);
    }
  }, [selectedDifficulty, questionNumber]);
  

 
  return (
    <View>
      <Text style={styles.timerText}>00:{timer < 10 ? `0${timer}` : timer}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timerText: {
    marginTop: 1,
    fontFamily: 'Rubik',
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

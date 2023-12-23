import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

interface TimerProps {
  setStop: (value: boolean) => void;
  questionNumber: number;
  second: number;
}

export const Timer: React.FC<TimerProps> = ({ setStop, questionNumber, second }: TimerProps) => {
  const [timer, setTimer] = useState<number>(second);

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
    setTimer(second);
  }, [questionNumber, second]);

  return (
    <View>
      <Text>{timer}</Text>
    </View>
  );
};

export default Timer;

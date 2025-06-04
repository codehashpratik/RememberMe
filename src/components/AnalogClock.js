import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Svg, {Circle, Line, Text as SvgText} from 'react-native-svg';
import normalize from '../utils/normalize';

const AnalogClock = ({size = 160}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const radius = size / 2;
  const center = radius;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const handCoords = (angle, length) => {
    const rad = (Math.PI / 180) * (angle - 90);
    return {
      x: center + length * Math.cos(rad),
      y: center + length * Math.sin(rad),
    };
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 10,
        backgroundColor: '#eaf8f9',
        borderRadius: size / 2,
        alignSelf: 'center',
        marginTop: normalize(25),
      }}
      height={size}
      width={size}>
      <Svg height={size} width={size}>
        <View
          style={{
            position: 'absolute',
            top: center - 7, // radius of the circle
            left: center - 7,
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: '#F0F4F3',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 6,
          }}
        />
        {/* Clock Face */}
        <Circle
          cx={center}
          cy={center}
          r={radius - 5}
          fill="#eaf8f9"
          stroke="#aaa"
          strokeWidth=""
        />

        {/* Hour Hand */}
        <Line
          x1={center}
          y1={center}
          x2={handCoords(hourAngle, radius * 0.6).x}
          y2={handCoords(hourAngle, radius * 0.6).y}
          stroke="#2E8F95"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Minute Hand */}
        <Line
          x1={center}
          y1={center}
          x2={handCoords(minuteAngle, radius * 0.6).x}
          y2={handCoords(minuteAngle, radius * 0.6).y}
          stroke="#7DC9CE"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Second Hand */}
        <Line
          x1={center}
          y1={center}
          x2={handCoords(secondAngle, radius * 0.6).x}
          y2={handCoords(secondAngle, radius * 0.6).y}
          stroke="#C8C8C8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center Circle */}
        <Circle cx={center} cy={center} r="7" fill="#F0F4F3" />

        {/* Clock Numbers (12, 3, 6, 9) */}
        <SvgText
          x={center}
          y={20}
          textAnchor="middle"
          fontSize="16"
          fill="#348888">
          12
        </SvgText>
        <SvgText
          x={size - 20}
          y={center + 5}
          textAnchor="middle"
          fontSize="16"
          fill="#348888">
          3
        </SvgText>
        <SvgText
          x={center}
          y={size - 8}
          textAnchor="middle"
          fontSize="16"
          fill="#348888">
          6
        </SvgText>
        <SvgText
          x={20}
          y={center + 5}
          textAnchor="middle"
          fontSize="16"
          fill="#348888">
          9
        </SvgText>
      </Svg>
    </View>
  );
};

export default AnalogClock;

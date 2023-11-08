import React, { PropsWithChildren, useEffect } from 'react'
import {
  StyleProp,
  ViewStyle
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>
const Skeleton:React.FC<Props> = (props):React.JSX.Element => {
  const animation = useSharedValue(0.5)

  useEffect(() => {
    animation.value = withRepeat(
      withSequence(withTiming(0.8, { duration: 500 }), withTiming(0.5, { duration: 500 })),
      Infinity,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animation.value
  }))
  return (
    <Animated.View style={[{ backgroundColor: '#dfdfdf' }, props.style, animatedStyle]}>{props.children}</Animated.View>
  )
}

export default Skeleton
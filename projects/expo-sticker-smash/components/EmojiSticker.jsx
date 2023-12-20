import { Image, View } from 'react-native'
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

/* La librería de react native reanimated nos ayuda a crear componentes para React
Native que puedan ser animados. */
const AnimatedImage = Animated.createAnimatedComponent(Image)
const AnimatedView = Animated.createAnimatedComponent(View)

export default function EmojiSticker({ imageSize, stickerSource }) {
  /* Creamos las variables para hacer transformaciones con react native reanimated. */
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  /* Creamos los gestos que vamos a usar para hacer las transformaciones. El hook
  useAnimatedGestureHandler nos permite crear gestos para nuestros componentes y de esta
  forma poder aplicar transformaciones al hacer gestos. */
  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    }
  })

  /* Creamos un gesto que nos permita mover el sticker. */
  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
  })

  /* Creamos un estilo para nuestro sticker. El hook useAnimatedStyle nos permite
  crear estilos para nuestros componentes y de esta forma poder aplicar estilos
  al hacer gestos. El hook withSpring nos permite hacer transformaciones con
  animaciones. */
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const containerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value, },
        { translateY: translateY.value, },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyles, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode='contain'
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}

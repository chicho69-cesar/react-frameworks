import { useRef, useState } from 'react'

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, View } from 'react-native'

import domToImage from 'dom-to-image'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'

import Button from './components/Button'
import CircleButton from './components/CircleButton'
import EmojiList from './components/EmojiList'
import EmojiPicker from './components/EmojiPicker'
import EmojiSticker from './components/EmojiSticker'
import IconButton from './components/IconButton'
import ImageViewer from './components/ImageViewer'

/* Si queremos usar imágenes con React Native y Expo, imágenes que estén en file system
de nuestro dispositivo debemos de importarlo mediante require. */
const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {
  /* Requerimos los permisos para usar la MediaLibrary */
  const [status, requestPermission] = MediaLibrary.usePermissions()

  const [selectedImage, setSelectedImage] = useState(null)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const imageRef = useRef()

  if (status === null) {
    requestPermission()
  }

  const pickImageAsync = async () => {
    /* Lanzamos el image picker para que el usuario pueda seleccionar una imagen. */
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    /* Si el usuario no cancela la selección de la imagen, la añadimos al estado. */
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      /* Las alerts en RN se muestran como advertencias nativas del dispositivo. */
      alert('You did not select any image.')
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const onSaveImageAsync = async () => {
    /* Si la plataforma es Movil. */
    if (Platform.OS !== 'web') {
      try {
        /* Capturamos la imagen del componente ImageViewer y la guardamos en la
        MediaLibrary. El método captureRef() recibe como parámetro el componente y las
        opciones de captura. En este caso, la opción de captura es: { height: 440, quality: 1 }. */
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })

        /* Guardamos la imagen en la MediaLibrary. */
        await MediaLibrary.saveToLibraryAsync(localUri)

        if (localUri) {
          alert('Image saved successfully.')
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        /* Capturamos la imagen del componente ImageViewer y la guardamos en el file system,
        cuando la plataforma es web. El método domToImage.toJpeg() recibe como parámetro el
        componente y las opciones de captura. En este caso, la opción de captura es:
        { quality: 0.95, width: 320, height: 440 }. */
        const dataUrl = await domToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        })

        /* Creamos un link para descargar la imagen. */
        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />

          {pickedEmoji !== null && (
            <EmojiSticker
              imageSize={40}
              stickerSource={pickedEmoji}
            />
          )}
        </View>
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label='Choose a photo'
            theme='primary'
            onPress={pickImageAsync}
          />

          <Button
            label='Use this photo'
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style='light' />
    </GestureHandlerRootView>
  )
}

/* En React Native podemos crear estilos como si utilizáramos css in js. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
})

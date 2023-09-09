import { FlatList, Image, Platform, Pressable, StyleSheet } from 'react-native'

const emojis = [
  require('../assets/images/emoji1.png'),
  require('../assets/images/emoji2.png'),
  require('../assets/images/emoji3.png'),
  require('../assets/images/emoji4.png'),
  require('../assets/images/emoji5.png'),
  require('../assets/images/emoji6.png'),
]

export default function EmojiList({ onSelect, onCloseModal }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item)
            onCloseModal()
          }}
        >
          <Image
            source={item}
            key={index}
            style={styles.image}
          />
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
})

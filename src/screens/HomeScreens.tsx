import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput, PixelRatio, ListRenderItemInfo, Platform} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import normalize from '../utils/normalizeText'
import { useHeaderHeight } from '@react-navigation/elements'
import { useProducts } from '../hooks/useProducts'
import { Products } from '../interfaces/productInterface'
import Skeleton from '../components/Skeleton'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigation'
import { useIsFocused } from '@react-navigation/native'

const { width, height } = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'HomeScreens'> { }

const HomeScreens = ({ navigation }: Props) => {
  const { isLoading, products, refreshProducts } = useProducts();
  const [productList, setProductList] = useState<Products[]>([]);
  const [search, setSearch] = useState('');
  const headerHeight = useHeaderHeight();
  const isFocused = useIsFocused();

  useEffect(() => {
    setProductList(products);
    setSearch('');
  }, [products]);

  useEffect(() => {
    if (isFocused) {
      refreshProducts();
    }
  }, [isFocused]);

  const Item = ({ item, index }: ListRenderItemInfo<Products>): React.JSX.Element => {
    return (
      <>
        <TouchableOpacity
          style={index === 0 ? styles.firstItem : index === products?.length - 1 ? styles.lastItem : styles.item}
          onPress={() => navigation.navigate('DeteailScreens', item)}>
          <View style={styles.itemSection}>
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.textId}>ID: {item.id}</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faChevronRight} color='gray' />
            </View>
          </View>
        </TouchableOpacity>
      </>)
  };

  if (isLoading) return <View style={[styles.container, { paddingTop: headerHeight - 50 }]}>
    <Skeleton style={styles.skeletonSearch} />
    <Skeleton style={styles.skeletonList} />
  </View>

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 40 : headerHeight }]}>
      <View style={styles.sectionSearch}>
        <TextInput placeholder="Search..." style={styles.itemInput}
          onChangeText={(text) => {
            setSearch(text);
            const filteredProducts = products.filter((product) => {
              return product.name.toLowerCase().includes(text.toLowerCase());
            });
            setProductList(filteredProducts);
          }}
          value={search}
        />
      </View>
      <View style={styles.sectionList}>
        <FlatList
          data={productList ?? []}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.sectionButton}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FormScreens')}>
          <Text style={styles.textButton}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20
  },
  sectionSearch: {
    width: '100%',
    height: height * 0.07,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  itemInput: {
    fontSize: 22,
  },
  sectionList: {
    marginTop: height * 0.04,
  },
  itemSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: '100%',
    padding: 20,
  },
  firstItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  lastItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: normalize(12),
    color: 'black',
  },
  textId: {
    fontSize: normalize(10),
    marginTop: 3
  },
  skeletonSearch: {
    width: width * 0.9,
    height: height * 0.07,
    marginTop: height * 0.04
  },
  skeletonList: {
    width: width * 0.9,
    height: height * 0.6,
    marginTop: height * 0.04
  },
  sectionButton: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 35,
  },
  button: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#FFDD02',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textButton: {
    color: 'black',
    fontWeight: 'bold'
  },
})



export default HomeScreens
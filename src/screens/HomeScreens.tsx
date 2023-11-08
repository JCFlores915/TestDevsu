import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput, PixelRatio, ListRenderItemInfo } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import normalize from '../utils/normalizeText'
import { useHeaderHeight } from '@react-navigation/elements'
import { useProducts } from '../hooks/useProducts'
import { Products } from '../interfaces/productInterface'
import Skeleton from '../components/Skeleton'

const { width, height } = Dimensions.get('screen');

const HomeScreens = () => {
  const { isLoading, products } = useProducts();
  const [productList, setProductList] = useState<Products[]>([]);

  const [search, setSearch] = React.useState('');

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const Item = ({ item: { name, id }, index }: ListRenderItemInfo<Products>): React.JSX.Element => {
    return (
      <>
        <TouchableOpacity style={index === 0 ? styles.firstItem : index === products?.length - 1 ? styles.lastItem : styles.item}>
          <View style={styles.item_section}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.text_id}>ID: {id}</Text>
            </View>
            <View>
              <FontAwesomeIcon icon={faChevronRight} />
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
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.section_search}>
        <TextInput placeholder="Search..." style={styles.item_input}
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
      <View style={styles.section_list}>
        <FlatList
          data={productList ?? []}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  section_search: {
    width: width * 0.9,
    height: height * 0.07,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  item_input: {
    fontSize: 22,
  },
  section_list: {
    marginTop: height * 0.04,
  },
  item_section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: width * 0.9,
    padding: 20,
  },
  firstItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: width * 0.9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  lastItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'grey',
    height: height * 0.07,
    width: width * 0.9,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: normalize(12),
    color: 'black',
  },
  text_id: {
    fontSize: normalize(10),
    marginTop: 3
  },
  skeletonSearch: { width: width * 0.9, height: height * 0.07, marginTop: height * 0.04 },
  skeletonList: { width: width * 0.9, height: height * 0.6, marginTop: height * 0.04 }
})



export default HomeScreens
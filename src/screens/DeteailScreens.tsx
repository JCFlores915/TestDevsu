import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigation'
import { useHeaderHeight } from '@react-navigation/elements'
import normalize from '../utils/normalizeText'
import {formatDate} from '../utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { deleteProduct } from '../api/ProductServices'
interface Props extends StackScreenProps<RootStackParams, 'DeteailScreens'> { }
const { height } = Dimensions.get('screen');

const DeteailScreens = ({ route, navigation }: Props) => {
  const [showModal, setShowModal] = useState(false);


  const productDetail = route.params;


  const headerHeight = useHeaderHeight();

  const handleDelete = () => {
    // Logic for deletion
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = async (id: string) => { 
    await deleteProduct(id);
    closeModal();
    navigation.navigate('HomeScreens');
  }
  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <View style={styles.sectionTitle}>
        <Text style={styles.textTitle}>ID: {productDetail?.id} </Text>
        <Text style={styles.textSubTitle}>Información extra</Text>
      </View>

      <View style={styles.sectionDetails}>
        <View style={styles.sectionDetailsRow}>
          <Text style={styles.textRowLeft}>Nombre </Text>
          <Text style={styles.textRowRight}>{productDetail?.name}</Text>
        </View>

        <View style={styles.sectionDetailsRow}>
          <Text style={styles.textRowLeft}>Descripción </Text>
          <Text style={styles.textRowRight}>{productDetail?.description}</Text>
        </View>

        <View style={styles.sectionDetailsRow}>
          <Text style={styles.textRowLeft}>Logo </Text>
          {/* <Text style={styles.textRowRight}>{productDetail?.logo}</Text> */}
          <Image
            style={{ width: '100%', height: 100 }}
            source={{ uri: productDetail?.logo }}
            resizeMode='contain'
          />
        </View>

        <View style={styles.sectionDetailsRow}>
          <Text style={styles.textRowLeft}>Fecha de liberación </Text>
          <Text style={styles.textRowRight}>{formatDate(productDetail?.date_release)}</Text>
        </View>

        <View style={styles.sectionDetailsRow}>
          <Text style={styles.textRowLeft}>Fecha de revisión </Text>
          <Text style={styles.textRowRight}>{formatDate(productDetail?.date_revision)}</Text>
        </View>
      </View>

      <View style={styles.sectonBottomButton}>
        <TouchableOpacity
          style={styles.buttonEdit}
          onPress={() => navigation.navigate('FormScreens', productDetail)}
        >
          <Text style={styles.buttonEditText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDeleted}
          onPress={handleDelete}>
          <Text style={styles.buttonDeletedText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon icon={faXmark} size={20} color='gray' />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalBodyText}>¿Estás seguro de eliminar el producto {productDetail?.name}?</Text>
            </View>
            <View style={styles.modalBodyFooter}>
              <TouchableOpacity
                style={styles.modalFooterBottomConfirm}
                onPress={() => confirmDelete(productDetail.id)}>
                <Text style={styles.buttonFooterConfirmText}>Confirmar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalFooterBottomCancel}
                onPress={closeModal}>
                <Text style={styles.buttonFooterDeletedText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20
  },
  sectionTitle: {
    flexDirection: 'column',
    width: '100%',
  },
  textTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: 'black'
  },
  textSubTitle: {
    fontSize: normalize(12),
    color: 'grey'
  },
  sectionDetails: {
    flexDirection: 'column',
    width: '100%',
    marginTop: height * 0.07,
  },
  sectionDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    marginBottom: height * 0.04
  },
  textRowLeft: {
    fontSize: normalize(12),
    color: 'grey'
  },
  textRowRight: {
    fontSize: normalize(12),
    fontWeight: 'bold',
    color: 'black'
  },
  sectonBottomButton: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 35,
  },
  buttonEdit: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonEditText: {
    color: '#0A497B'
  },
  buttonDeleted: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: height * 0.02
  },
  buttonDeletedText: {
    color: 'white'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    height: height * 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: height * 0.04,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  modalBody: {
    alignItems: 'center',
    marginTop: height * 0.05,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingBottom: 50
  },
  modalBodyText: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  modalBodyFooter: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: height * 0.04,
    marginTop: height * 0.05,
  },

  modalFooterBottomConfirm: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#FFDD02',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: height * 0.02
  },
  buttonFooterConfirmText: {
    color: 'black',
    fontWeight: 'bold'
  },
  modalFooterBottomCancel: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  buttonFooterDeletedText: {
    color: 'black',
    fontWeight: 'bold'
  },
})

export default DeteailScreens
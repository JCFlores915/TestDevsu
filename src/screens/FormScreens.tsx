import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import normalize from '../utils/normalizeText';
import InputCustom from '../components/InputCustom';
import { validateInput, validateIdExist } from '../utils/inputCustomValidate';
import { getDateNow, getDateMoreOneYear } from '../utils/formatDate';
import { FormFields } from '../interfaces/inputInterface';
import { postProduct, validateIdProduct } from '../api/ProductServices';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreens'> { }

const FormScreens = ({ navigation }: Props) => {
  const [formFields, setFormFields] = useState<FormFields>({
    id: '',
    name: '',
    description: '',
    logo: '',
    releaseDate: '',
    reviewDate: '',
  });

  const [inputErrors, setInputErrors] = useState<FormFields>({
    id: '',
    name: '',
    description: '',
    logo: '',
    releaseDate: '',
    reviewDate: '',
  });


  const handleFieldValidation = (fieldName: string, value: string) => {
    const { messageError, isValid } = validateInput(value, fieldName) as { messageError: string, isValid: boolean };
    setInputErrors((prevErrors) => ({ ...prevErrors, [fieldName]: messageError }));
    return isValid;
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormFields((prevFields) => ({ ...prevFields, [fieldName]: value }));
    handleFieldValidation(fieldName, value);
  };

  const handleSubmit = async () => {
    const fields: Array<keyof FormFields> = Object.keys(formFields) as Array<keyof FormFields>;
    let isValidForm = true;

    fields.forEach((field) => {
      const isValid = handleFieldValidation(field, formFields[field]);
      if (!isValid) {
        isValidForm = false;
      }
    });

    if (isValidForm) {

      const { id } = formFields;
      const respValId = await validateIdProduct(id);

      if (respValId) {
        const { messageError, isValid } = validateIdExist(id);
        setInputErrors((prevErrors) => ({ ...prevErrors, id: messageError }));
        isValidForm = isValid;
      }

      if (isValidForm) {
        const { releaseDate, reviewDate, ...rest } = formFields;
        const data = {

          date_release: releaseDate,
          date_revision: reviewDate,
          ...rest,
        };

        await postProduct(data).finally(() => {
          navigation.navigate('HomeScreens');
        });
      }
    }
  };

  const handleRestart = () => {
    setFormFields({
      id: '',
      name: '',
      description: '',
      logo: '',
      releaseDate: new Date().toISOString(),
      reviewDate: '',
    });

    setInputErrors({
      id: '',
      name: '',
      description: '',
      logo: '',
      releaseDate: '',
      reviewDate: '',
    });

  
  };

  useEffect(() => {
    setFormFields((prevFields) => ({
      ...prevFields,
      releaseDate: getDateNow(),
    }));
  }, []);

  useEffect(() => {
    setFormFields((prevFields) => ({
      ...prevFields,
      reviewDate: getDateMoreOneYear(formFields.releaseDate),
    }));
  }, [formFields.releaseDate]);



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.textTitle}>Formulario de Registro</Text>
      {Object.keys(formFields).map((field, index) => (
        <InputCustom
          key={index}
          title={field}
          value={formFields[field as keyof FormFields]}
          setValue={(value: string) => handleInputChange(field, value)}
          messageError={inputErrors[field as keyof FormFields]}
          isValid={inputErrors[field as keyof FormFields] === ''}
          editable={field !== 'reviewDate'}
        />
      ))}
      <View>
        <TouchableOpacity style={styles.buttonSend} onPress={handleSubmit} >
          <Text style={styles.textButtonSend}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRestart} onPress={handleRestart}>
          <Text style={styles.textButtonRestart}>Reinicar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10
  },
  textTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20
  },
  buttonSend: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDD02',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5
  },
  textButtonSend: {
    fontWeight: 'bold',
    color: 'black',
  },
  buttonRestart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  textButtonRestart: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FormScreens





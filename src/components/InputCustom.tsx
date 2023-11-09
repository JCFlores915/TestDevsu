import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { InputCustomProps, nameFiled } from '../interfaces/inputInterface';
import normalize from '../utils/normalizeText';

const InputCustom = ({ title, value, setValue, messageError = '', isValid = true, editable = true }:InputCustomProps) => {
    const handleTextChange = (text:string) => {
        setValue(text);
    };

    return (
        <View style={styles.containerInput}>
            <Text style={styles.textTitleInput}>{
                nameFiled[title as keyof typeof nameFiled]
            }</Text>
            <TextInput
                style={isValid ? styles.textInput : styles.textInputError}
                value={value}
                onChangeText={handleTextChange}
                editable={editable}
            />
            {messageError && <Text style={styles.textMessageError}>{messageError}</Text>}
        </View>
    );
};


const styles = StyleSheet.create({
    containerInput: {   
    },
    textTitleInput: {
        fontSize: normalize(12),
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    textInputError: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    textMessageError: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
    },
});


export default InputCustom;
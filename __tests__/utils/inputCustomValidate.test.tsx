// crear las pruebas para  inputCustomValidate a las funciones validateInput y validateIdExist


import { validateInput } from '../../src/utils/inputCustomValidate';

describe('Pruebas para la funcion validateInput', () => {
    test('Debe retornar un mensaje de error y un false si el campo id es menor a 3 caracteres', () => {
        const value = '12';
        const inputName = 'id';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo ID debe de estar entre 3 y 10 caracteres');
        expect(isValid).toBe(false);
    });

    test('Debe retornar un mensaje de error y un false si el campo id es mayor a 10 caracteres', () => {
        const value = '12345678910';
        const inputName = 'id';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo ID debe de estar entre 3 y 10 caracteres');
        expect(isValid).toBe(false);
    });

    test('Debe retornar un mensaje de error y un false si el campo name es menor a 5 caracteres', () => {
        const value = '1234';
        const inputName = 'name';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo Nombre debe de estar entre 5 y 100 caracteres');
        expect(isValid).toBe(false);
    });

    test('Debe retornar un mensaje de error y un false si el campo name es mayor a 100 caracteres', () => {
        const value = '1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859';
        const inputName = 'name';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo Nombre debe de estar entre 5 y 100 caracteres');
        expect(isValid).toBe(false);
    });

    test('Debe retornar un mensaje de error y un false si el campo description es menor a 10 caracteres', () => {
        const value = '123456789';
        const inputName = 'description';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo Descripción debe de estar entre 10 y 100 caracteres');
        expect(isValid).toBe(false);
    });  

    test('Debe retornar un mensaje de error y un false si el campo description es mayor a 100 caracteres', () => {
        const value = '123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657';
        const inputName = 'description';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo Descripción debe de estar entre 10 y 100 caracteres');
        expect(isValid).toBe(false);
    });

    test('Debe retornar un mensaje de error y un false si el campo logo esta vacio', () => {
        const value = '';
        const inputName = 'logo';
        const { messageError, isValid } = validateInput(value, inputName) as { messageError: string, isValid: boolean };
        expect(messageError).toBe('El campo Logo es requerido');
        expect(isValid).toBe(false);
    });


});
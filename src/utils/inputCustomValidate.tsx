export const validateInput = (value: string, inputName: string) => {
    switch (inputName) {
        case 'id':
            return validateField(value, 'ID', 3, 10);

        case 'name':
            return validateField(value, 'Nombre', 5, 100);

        case 'description':
            return validateField(value, 'Descripción', 10, 100);

        case 'logo':
            return validateNonEmptyField(value, 'Logo');

        case 'releaseDate':
            return validateReleaseDate(value);

        case 'reviewDate':
            return validateNonEmptyField(value, 'Fecha de revisión');

        case 'idExist':
            return validateIdExist(value);
    }
};

const validateField = (
    value: string,
    fieldName: string,
    minChars: number,
    maxChars: number
) => {
    let messageError = '';
    let isValid = true;

    if (value.length === 0) {
        messageError = `El campo ${fieldName} es requerido`;
        isValid = false;
    } else if (value.length < minChars || value.length > maxChars) {
        messageError = `El campo ${fieldName} debe de estar entre ${minChars} y ${maxChars} caracteres`;
        isValid = false;
    }

    return { messageError, isValid };
};

const validateNonEmptyField = (value: string, fieldName: string) => {
    let messageError = '';
    let isValid = true;

    if (value.length === 0) {
        messageError = `El campo ${fieldName} es requerido`;
        isValid = false;
    }

    return { messageError, isValid };
};

const validateReleaseDate = (value: string) => {
    let messageError = '';
    let isValid = true;

    const dateRelease = new Date(value);
    dateRelease.setDate(dateRelease.getDate() + 1);
    dateRelease.setHours(0, 0, 0, 0);
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    if (value.length === 0) {
        messageError = '';
        isValid = false;
    } else if (dateRelease.getTime() < dateNow.getTime()) {
        messageError = `La fecha de liberación debe de ser mayor a la fecha actual`;
        isValid = false;
    }

    return { messageError, isValid };
};

export const validateIdExist = (value: string) => {
    let messageError = `El ID: ${value} ya existe, ingrese otro ID`;
    let isValid = false;

    return { messageError, isValid };
 };



export interface InputCustomProps {
    title: string;
    value: string;
    setValue: (value: string) => void;
    onChangeText?: (value: string) => void;
    messageError?: string;
    isValid?: boolean;
    editable?: boolean;
}

export interface FormFields {
    id: string;
    name: string;
    description: string;
    logo: string;
    releaseDate: string;
    reviewDate: string;
}


export const nameFiled = {
    id: 'ID',
    name: 'Nombre',
    description: 'Descripción',
    logo: 'Logo',
    releaseDate: 'Fecha de lanzamiento',
    reviewDate: 'Fecha de revisión',
}
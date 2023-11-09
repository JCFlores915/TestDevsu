

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
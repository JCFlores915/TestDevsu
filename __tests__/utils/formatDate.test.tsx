
import { formatDate, formatDateOnly, getDateNow, getDateMoreOneYear} from '../../src/utils/formatDate';

describe('Pruebas para la funcion formatDate', () => {
    test('Debe retornar la fecha formateada', () => {
        const date = '2021-05-12T00:00:00.000Z';
        const dateFormated = formatDate(date);
        expect(dateFormated).toBe('12/05/2021');
    });
});

describe('Pruebas para la funcion formatDateOnly', () => {
    test('Debe retornar la fecha formateada', () => {
        const date = '2021-05-12T00:00:00.000Z';
        const dateFormated = formatDateOnly(date);
        expect(dateFormated).toBe('2021-05-12');
    });
});

describe('Pruebas para la funcion getDateNow', () => {
    test('Debe retornar la fecha actual', () => {
        const date = getDateNow();
        expect(date).not.toBeNull();
    });
});

describe('Pruebas para la funcion getDateMoreOneYear', () => {
    test('Debe retornar la fecha aumentada un año', () => {
        const date = '2021-05-12';
        const dateFormated = getDateMoreOneYear(date);
        expect(dateFormated).toBe('2022-05-12');
    });
});
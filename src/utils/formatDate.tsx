

const formatDate = (date: string) => {
        // de 2023-11-21T00:00:00.000+00:00 a 21/11/2023
        const dateSplit = date.split('T');
        const dateSplit2 = dateSplit[0].split('-');
        const dateFormated = `${dateSplit2[2]}/${dateSplit2[1]}/${dateSplit2[0]}`;
        return dateFormated;
}

export default formatDate;
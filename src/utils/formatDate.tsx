

export const formatDate = (date: string) => {
        const dateSplit = date.split('T');
        const dateSplit2 = dateSplit[0].split('-');
        const dateFormated = `${dateSplit2[2]}/${dateSplit2[1]}/${dateSplit2[0]}`;
        return dateFormated;
}

export const formatDateOnly = (date: string) => {
        const dateSplit = date.split('T');
        const dateFormated = dateSplit[0];
        return dateFormated;
}


export const getDateNow = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const formatMonth = month < 10 ? `0${month}` : month;
        const formatDay = day < 10 ? `0${day}` : day;

        const dateRelease = `${year}-${formatMonth}-${formatDay}`;
        return dateRelease;
}


export const getDateMoreOneYear = (releaseDate: string) => {
        const date = new Date(releaseDate);
        const year = date.getFullYear() + 1;
        const month = date.getMonth() + 1;
        const day = date.getDate() + 1;

        const formatMonth = month < 10 ? `0${month}` : month;
        const formatDay = day < 10 ? `0${day}` : day;

        const dateReview = `${year}-${formatMonth}-${formatDay}`;

        return dateReview;
}
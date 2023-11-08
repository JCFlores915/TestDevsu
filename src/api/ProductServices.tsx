 /// hacer un fetch a la api de productos y retornar la lista de productos en un array 

// URL: https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros

const Url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const authorId = '1234567';

const getProducts = async () => {
    const response = await fetch(`${Url}/bp/products`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AuthorId': authorId
        }
    });
    const data = await response.json();
    return data;
}

export { getProducts };
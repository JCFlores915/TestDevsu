 /// hacer un fetch a la api de productos y retornar la lista de productos en un array 

import { Products } from "../interfaces/productInterface";

// URL: https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros

const Url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
const authorId = '1234567';

// GET PRODUCTS
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

// GET PRODUCTS BY ID
const getProductById = async (id: string) => {
    const response = await fetch(`${Url}/bp/products/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AuthorId': authorId
        }
    });
    const data = await response.json();
    return data;
}


// POST PRODUCTS
const postProduct = async (product: Products) => {

    const response = await fetch(`${Url}/bp/products`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'AuthorId': authorId
        },
        body: JSON.stringify(product)
    });
    
    return response;
};

// PUT PRODUCTS
const putProduct = async (product: any) => {
    const response = await fetch(`${Url}/bp/products`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'AuthorId': authorId
        },
        body: JSON.stringify(product)
    });
    
    return response;
};

// DELETE PRODUCTS

const deleteProduct = async (id: string) => {
    const response = await fetch(`${Url}/bp/products?id=${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'AuthorId': authorId
        }
    });
    
    return response;
}

export { getProducts, getProductById, deleteProduct, postProduct, putProduct };

import { useEffect, useState } from "react";
import { Products } from "../interfaces/productInterface";
import { getProducts } from "../api/ProductServices";

export const useProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Products[]>([]);

    const getProductos = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            setProducts([]);
            setIsLoading(false);
        }
    };

    const refreshProducts = async () => {
        setIsLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
            setIsLoading(false);
        } catch (error) {
            setProducts([]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    return {
        isLoading,
        products,
        refreshProducts,
    };
}
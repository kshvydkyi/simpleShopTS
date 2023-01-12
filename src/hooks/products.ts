
import axios, {AxiosError} from 'axios';
import { useEffect, useState } from 'react';

import { IProduct } from '../models';
const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const addProduct = (product: IProduct) => {
        setProducts(prev => [...prev, product])
    }
    const getProducts = async () => {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products/?limit=5');
            setProducts(response.data)
            setLoading(false);
        }
        catch (e: unknown) {
            const error = e as AxiosError;
            if (e) {
                setLoading(false);
               setError(error.message);
            }
        }
    }
    useEffect(() => {
        getProducts()
    }, []);

    return {products, error, loading, addProduct};
}

export default useProducts;


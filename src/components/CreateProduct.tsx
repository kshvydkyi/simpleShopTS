import React, { useState } from "react";
import { IProduct } from "../models";
import axios from 'axios';
import ErrorMsg from "./Error";

const productData: IProduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}
interface CreateProductProps {
    onCreate: (product: IProduct) => void
}
const CreateProduct = ({onCreate}: CreateProductProps) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')
        if(title.trim().length === 0 ){
            setError('Please enter valid title')
            return
        }
        productData.title = title;

        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        onCreate(response.data);
    }

    return (
    <>
    <form onSubmit={submitHandler}>
        <input 
        
        type='text'
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={title}
        onChange={event => setTitle(event.target.value)}
        />
        {error && <ErrorMsg error={error}/>}    
        <button type="submit" className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
    </form>    
    </>
)
}

export default CreateProduct;
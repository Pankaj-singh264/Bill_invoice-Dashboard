import axios from 'axios'
import React,{createContext,useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

axios.defaults.headers.post['Content-Type'] ='application/json'

export const ItemAxios =axios.create()

const ItemContext = createContext()


export const ItemsProvider =({children})=>{
    const [items, setItems] = useState(second)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const fetchItems = async () => {
        try {
            const response = await ItemAxios.get(`${API_URL}/items`)
            setItems(response.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    



    useEffect(() => {

        fetchItems()
    }, [])
    
    const addItem = async (item) => {
        try {
            const response = await ItemAxios.post(`${API_URL}/items`, item)
            setItems((prevItems) => [...prevItems, response.data])
        } catch (error) {
            setError(error)
        }
    }
    const removeItem = async (id) => {
        try {
            await ItemAxios.delete(`${API_URL}/items/${id}`)
            setItems((prevItems) => prevItems.filter((item) => item.id !== id))
        } catch (error) {
            setError(error)
        }
    }
    const updateItem = async (id, updatedItem) => {
        try {
            const response = await ItemAxios.put(`${API_URL}/items/${id}`, updatedItem)
            setItems((prevItems) =>
                prevItems.map((item) => (item.id === id ? response.data : item))
            )
        } catch (error) {
            setError(error)
        }
    }

    const value = { items, loading, error, addItem, removeItem, updateItem }

    return (
        <ItemContext.Provider value={value}>
            {children}

        </ItemContext.Provider>
    )
}
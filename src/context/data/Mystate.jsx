import React, { useEffect } from 'react'
import Mycontext from '../data/Mycontext';
import { useState } from 'react';
import { toast } from 'react-toastify'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useHref } from 'react-router-dom';
function Mystate(props) {
  const [mode, setMode] = useState("light")
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light")
      document.body.style.backgroundColor = "white";
    }
  }
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  })

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error("All fields are required")
    }
    setLoading(true);
    try {

      const productRef = collection(fireDB, 'products');
      await addDoc(productRef, products);
      toast.success("Product Added Successfully")
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([])

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArr = [];
        QuerySnapshot.forEach((doc) => {
          productArr.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArr);
        setLoading(false);
      })
      return data;

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, [])

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'products', products.id), products)
      toast.success("Product Updated Successfully")
      getProductData();
      window.location.href = "/dashboard";
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id))
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [order, setOrder] = useState([])

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, 'order'))
      const ordersArray = []
      console.log(result);
      console.log(result.data);

      result.forEach((doc) => {
        ordersArray.push(doc.data())
      })
      setOrder(ordersArray)
      console.log(ordersArray);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [user, setUser] = useState([])

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, 'users'))
      const userArray = []
      console.log(result);
      console.log(result.data);

      result.forEach((doc) => {
        userArray.push(doc.data())
      })
      setUser(userArray)
      console.log(userArray);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


  return (
    <Mycontext.Provider value={{
      mode, toggleMode, loading, setLoading,
      products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice
    }}>
      {props.children}
    </Mycontext.Provider>
  )
}

export default Mystate

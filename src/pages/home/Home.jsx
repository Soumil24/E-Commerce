import {React,useContext} from 'react'
import Layout from '../../components/layout/Layout'
import mycontext from '../../context/data/Mycontext'
import Herosection from '../../components/heroSection/Herosection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import Track from '../../components/track/Track';
import { useDispatch, useSelector } from 'react-redux';
import { addtocart, deletefromcart } from '../../redux/cartSlice';

function Home() {
    const context = useContext(mycontext);

    const dispatch = useDispatch();
    const cartitems = useSelector((state)=> state.cart)

    console.log(cartitems);
    
    const addfunction = ()=>{
      dispatch(addtocart("Hello World !!"));
    }

    const deletefunction = ()=>{
      dispatch(deletefromcart("Hello World !!"))
    }
    return (
    <Layout>
        <Herosection/>
        <Filter/>
        <ProductCard/>
        <Track/>
        <Testimonial/>
    </Layout>
  )
}

export default Home

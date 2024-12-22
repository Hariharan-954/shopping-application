import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import fourStar from '../images/icons/fourStar.png'
import truck from '../images/icons/truck.png'
import refresh from '../images/icons/refresh.png'

import { addToWishList,productToCart } from '../redux/actions';
import CardList, { CartAlertComponent, WishListAlertComponent } from './CardList';
import { QuantityInput } from './Cart'



const ProductSpec = () => {

    const [cartAlert, setCartAlert] = useState(false);
    const [wishListAlert, setWishListAlert] = useState(false)
    const location = useLocation()
    const dispatch = useDispatch()
    const item = location?.state || {}

    const [qty, setQty] = useState(item.quantity)

    const allProducts = useSelector((state) => state.cartList.allProducts)
    const updatedItem = allProducts.find((obj) => (obj.id === item.id))

    const handleAddToCart = (item) => {
        const updatedItem = { ...item, quantity: qty }
        dispatch(productToCart(updatedItem))
        setCartAlert(true)

        setTimeout(() => {
            setCartAlert(false)
        }, 2000)
    }

    const handleWishList = (value) => (event) => {

        const isChecked = event.target.checked
        const updatedWishList = {
            ...value,
            wishList: isChecked
        }
        dispatch(addToWishList(updatedWishList))
        if (isChecked) {
            setWishListAlert(true)

            setTimeout(() => {
                setWishListAlert(false)
            }, 2000)
        }

    }

    return (
        <>
            <Box style={{ display: "flex" }} sx={{ flexDirection: { xs: "column", xl: "row" } }}  >
                <Box sx={{ width: { xs: "300px", xl: "600px" }, height: { xs: "300px", xl: "500px" } }} >
                    <img src={updatedItem?.image} alt='joyStick' style={{ width: "100%", height: "100%" }} ></img>
                </Box>
                <Box style={{ display: 'flex', flexDirection: "column" }} sx={{ marginLeft: { xs: "0px", xl: "60px" }, marginRight: { xs: "0px", xl: "50px" }, marginBottom:{ xs:"30px" , xl:"0px" } }}  >
                    <Typography variant="h5" sx={{ fontWeight: "500", mb: "5px", fontSize: { xs: "medium", xl: "x-large" } }} >{updatedItem?.name}</Typography>
                    <Box sx={{ width: { xs: "50px", xl: "100px" }, marginBottom: { xs: "5px", xl: "10px" } }} >
                        <img src={fourStar} style={{ width: "100px", height: "20px" }} alt='joyStick' ></img>
                    </Box>
                    <Typography variant="h5" sx={{ mb: { xs: "10px", xl: "20px" }, fontSize: { xs: "medium", xl: "x-large" } }} >Rs.{updatedItem?.price}</Typography>
                    <Typography sx={{ height: "63px", textAlign: 'justify', mb: { xs: '15px', xl: "35px" }, fontSize: { xs: "small", xl: "medium" }, width: { xs: "100%", xl: "373px" } }} >{updatedItem.about} </Typography>

                    <Divider sx={{ borderColor: "#6d6b6b", mb: { xs: "40px", xl: "40px" } }} ></Divider>

                    <Button variant="contained" sx={{ width: { xs: "120px", xl: "165px" }, textTransform: "none", backgroundColor: "#DB4444", marginBottom: "25px", justifyContent: "center" }} onClick={() => handleAddToCart(updatedItem)}>Add To Cart</Button>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "26px", mb: { xs: "33px", xl: "56px" } }} >

                        <Box >
                            <QuantityInput
                                quantity={qty}
                                onIncrement={() => setQty(Number(qty) + 1)}
                                onDecrement={() => setQty(Number(qty) - 1)}
                            />
                        </Box>
                        <Button variant="contained" sx={{ width: { xs: "120px", xl: "165px" }, height: { xs: "35px", xl: "40px" }, textTransform: "none", backgroundColor: "#DB4444", }}  >Buy Now</Button>
                        <Box sx={{ border: "1px solid black", justifyContent: "center", display: "flex", borderRadius: "5px", height: { xs: "34px", xl: "39px" } }} >
                            <Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                checked={Boolean(updatedItem.wishList)}
                                sx={{
                                    color: "red",
                                    "&.Mui-checked": {
                                        color: "red",
                                    },
                                }}
                                onChange={handleWishList(updatedItem)}
                            />
                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid black", borderRadius: "5px", height: { xs: "92px", xl: "214px" } }} >

                        <Box sx={{  display: "flex", flexDirection: "row" , marginTop : {  xs:"5px",  xl:"30px" },  marginBottom:{  xs:"0px", xl:"30px" }   }} >
                            <Box    sx={{ width:  { xl:"40px" }, height: { xl:"40px" }, marginRight: { xs:"5px",  xl:"15px"}, marginLeft: {xl:"15px"}  }}   >
                                <img src={truck} alt='truck-icon' ></img>
                            </Box>
                            <Box sx={{  gap: { xs:"0px" , xl:"5px" ,display: "flex", flexDirection: "column" } }} >
                                <Typography  sx={{ fontWeight: {  xs:"500", xl:"500" }, fontSize:{  xs:"13px", xl:"17px" }   }}  >Free Delivery</Typography>
                                <Typography  sx={{ textDecoration: "underline", fontWeight: "500" ,fontSize:{  xs:"13px", xl:"13px" } }}   >Enter your postal code for Delivery Availability</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ borderColor: "#6d6b6b" }} ></Divider>

                        <Box sx={{ display: "flex", flexDirection: "row" , marginTop : {  xs:"5px",  xl:"30px" },  marginBottom:{  xs:"0px", xl:"30px" }  }  } >
                            <Box  sx={{ width:  { xl:"40px" }, height: { xl:"40px" }, marginRight: { xs:"5px",  xl:"15px"}, marginLeft: {xl:"15px"}  }}  >
                            <img src={refresh} alt='refresh-icon' ></img>
                            </Box>
                            <Box sx={{  gap: { xs:"0px" , xl:"5px" ,display: "flex", flexDirection: "column" } }} >
                                <Typography sx={{ fontWeight: {  xs:"500", xl:"500" }, fontSize:{  xs:"13px", xl:"17px" }   }}  >Return Delivery</Typography>
                                <Typography sx={{ textDecoration: "underline", fontWeight: "500" ,fontSize:{  xs:"13px", xl:"13px" } }}  >Free 30 Days Delivery Returns. Details</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>

                {/* <Divider sx={{ borderColor: "#6d6b6b", marginRight: "23px" }} orientation="vertical" ></Divider> */}

                <Box style={{ display: "flex", flexDirection: "column",flex: "1 1 200px"}}  sx={{ marginBottom: { xs:"0px" , xl:"23px"}, }} >

                    <div style={{display:"flex", flexDirection:"row"}} >
                     <Box  sx={{width:"20px" , height:"40px",  backgroundColor:"#DB4444", borderRadius:"5px", marginRight:"13px"}}  >
                     </Box>

                    <Typography variant="h6"  sx={{mb:"12px", color:"#DB4444", marginTop:"5px"}}  >Related Item</Typography>
                    </div>
                    <Box
                    sx={{
                        overflowY: { xs: "hidden", sm: "scroll" },
                        overflowX: { xs: "scroll", sm: "hidden" },
                        maxHeight: { xs: "none", xl: 590 },
                        maxWidth : { xs: 340 , sm:"none"},
                        display: "flex",
                    }}  
                     >

                        <CardList CartWishListbuttonDisable={true}  removeItem ={updatedItem}   isFlexible ={true} />
                    </Box>

                </Box>
            </Box>
            {cartAlert && (
                    <div style={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1000 }}>
                        <CartAlertComponent />
                    </div>
                )}
                {wishListAlert && (
                    <div style={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1000 }}>
                        <WishListAlertComponent />
                    </div>
                )}
        </>

    );
};

export default ProductSpec;
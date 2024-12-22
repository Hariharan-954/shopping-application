import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid2';

import wishListEmpty from '../images/wishListEmpty.png'
import Cart1 from '../images/Cart1.png'

import { addToCart } from '../redux/actions';
import { CartAlertComponent } from './CardList';


const WishList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [cartAlert, setCartAlert] = useState(false);


    const handleViewProduct = (value) => {
        navigate('/productSpec', { state: value })
    }

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        setCartAlert(true);

        setTimeout(() => {
            setCartAlert(false);
        }, 2000);
    }


    let wishListItems = useSelector((state) => state.cartList.allProducts) || []
    wishListItems = wishListItems?.filter((item) => item.wishList === true) || []

    return (
        <>
            {wishListItems.length ? (

                <Box sx={{ paddingTop: "20px" }} >

                    <Grid sx={{
                        display: "flex", flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",


                    }} container spacing={{ xs: "22.2px", sm: "47px", md: "48px", xl: "40.8px" }} columnSpacing={{ xs: "39px", sm: "39px", md: "39px", xl: "39px" }}  >
                        {wishListItems?.map((value, index) => {

                            return (
                                <Grid
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center", 
                                    }}
                                >
                                    <div sx={{ display: "flex", flexDirection: "column" ,width: { xs: "142px", xl: "300px" }, height: { xs: "142px", xl: "339px" } }} key={index}>

                                        <Box sx={{ backgroundColor: "rgb(247 247 247)", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: { xs: "142px", xl: "300px" }, height: { xs: "142px", xl: "232px" } }} >
                                            <Box sx={{ width: { xs: "100px", xl: "178px" }, height: { xs: "100px", xl: "178px" } }} >
                                                <img src={value.image} style={{ cursor: "pointer", width: "100%", height: "100%" }} alt='product'
                                                    onClick={() => handleViewProduct(value)}
                                                ></img>
                                            </Box>
                                        </Box>

                                        <Grid container spacing={1.5} sx={{ width: "100%", display: "grid" }}>

                                            <Button variant="contained" sx={{ backgroundColor: "#5506bb", textTransform: "none", fontSize: "revert", fontWeight: "700", height: { xs: "22px", xl: "100%" } }} onClick={() => (handleAddToCart(value))}  > <img src={Cart1} alt="cart icon" style={{ width: "20px", marginRight: "8px" }} />
                                                Add To Cart</Button>
                                            <Grid container spacing={1} sx={{ width: "100%", display: "grid" }}>
                                                <Typography sx={{ fontWeight: "500", fontSize: { xs: "x-small", xl: "100%" } }} >{value.name}</Typography>
                                                <Typography sx={{ color: "red", fontSize: { xs: "x-small", xl: "100%" } }} >Rs.{value.price}</Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            )
                : (
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: "column",
                            gap: "25px"
                        }}
                    >

                        <Box sx={{ width: { xs: "10rem", xl: "23rem" }, height: { xs: "10rem", xl: "23rem" }, marginTop: { xs: "10rem", xl: "5rem" } }} >
                            <img src={wishListEmpty} style={{ width: "100%", height: "100%" }} alt='wishListEmpty' />
                        </Box>
                        <Typography
                            sx={{ fontSize: { xs: "22px", xl: "52px" } }}
                        >
                            No Items in WishList !
                        </Typography>

                        <Typography
                            sx={{ fontSize: { xs: "22px", xl: "32px" } }}
                        >
                            Click{' '}
                            <Box
                                component="span"
                                sx={{
                                    color: 'red',
                                    fontSize: { xs: '22px', xl: '52px' },
                                }}
                            >
                                ♥
                            </Box>{' '}
                            to save products
                        </Typography>

                    </div>
                )
            }
            {cartAlert && (
                <div style={{ position: "fixed", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1000 }}>
                    <CartAlertComponent />
                </div>
            )}
        </>
    );
};

export default WishList;
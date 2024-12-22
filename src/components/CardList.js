import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid2';

import { addToCart, addToWishList } from '../redux/actions';
import Cart1 from '../images/Cart1.png'


export const CartAlertComponent = () => {
    return (
        <>
            <Alert
                severity="success"
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#bbe9bb",
                    justifyContent: "center",
                    width: { xs: "15rem", xl: "25rem" },
                    zIndex: 10,
                }}
            >
                Item added to cart successfully!
            </Alert>
        </>
    )
}


export const WishListAlertComponent = () => {
    return (
        <>
            <Alert
                severity="success"
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#bbe9bb",
                    justifyContent: "center",
                    width: { xs: "12rem", xl: "25rem" },
                    zIndex: 10,
                }}
            >
                Item added to wishList !
            </Alert>
        </>
    )
}



const CardList = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cartAlert, setCartAlert] = useState(false);
    const [wishListAlert, setWishListAlert] = useState(false)

    let allProducts = useSelector((state) => state.cartList.allProducts)


    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        setCartAlert(true);

        setTimeout(() => {
            setCartAlert(false);
        }, 2000);
    }

    const { CartWishListbuttonDisable, removeItem, isFlexible } = props

    const [buttonDisable, setButtonDisable] = useState(true)

    useEffect(() => {
        if (CartWishListbuttonDisable) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [CartWishListbuttonDisable]);


    if ((removeItem)) {
        allProducts = allProducts.filter((product) => (JSON?.stringify(removeItem) !== JSON?.stringify(product)))
    }


    const handleViewProduct = (value) => {
        navigate('/productSpec', { state: value })
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
                setWishListAlert(false);
            }, 2000);
        }
    }


    return (
        <div >
            <Box sx={{ justifyContent: "center", paddingTop: "20px" }} >

                {/* <div style={{ position: "relative" }} > */}

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
                <Grid sx={{
                    display: "flex", flexDirection: "row", flexWrap: isFlexible ? { xs: "nowrap", xl: "wrap" } : "wrap",
                    justifyContent: "center"

                }} container spacing={{ xs: "22.2px", sm: "47px", md: "48px", xl: "40.8px" }} columnSpacing={{ xs: "39px", sm: "39px", md: "39px", xl: "39px" }}
                >
                    {allProducts?.map((value, index) => {
                        return (
                            <div style={{ display: "inline-flex", flexDirection: "column" }} sx={{ width: { xs: "142px", xl: "300px" }, height: { xs: "142px", xl: "339px" } }} key={index}>

                                <Box style={{ backgroundColor: "rgb(247 247 247)", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} sx={{ width: { xs: "142px", xl: "300px" }, height: { xs: "142px", xl: "232px" } }} >
                                    <Box sx={{ width: { xs: "100px", xl: "178px" }, height: { xs: "100px", xl: "178px" } }} >
                                        <img src={value.image} style={{ cursor: "pointer", width: "100%", height: "100%" }} alt='product'
                                            onClick={() => handleViewProduct(value)}
                                        ></img>
                                    </Box>

                                    <Checkbox
                                        icon={

                                            <FavoriteBorder
                                                sx={{ width: { xs: "15px", sm: "24px" } }}
                                            />
                                        }
                                        checkedIcon={

                                            <Favorite
                                                sx={{ width: { xs: "15px", sm: "24px" }, }}
                                            />
                                        }
                                        checked={Boolean(value.wishList)}
                                        sx={{
                                            position: "absolute",
                                            bottom: { xs: "105px", sm: "101px", md: "99px", xl: "185px" }, // Adjust the bottom position for different screen sizes
                                            left: { xs: "108px", sm: "98px", md: "98px", xl: "243px" }, // Adjust the left position for different screen sizes
                                            color: "red",
                                            "&.Mui-checked": {
                                                color: "red",
                                            },
                                        }}
                                        onChange={handleWishList(value)}
                                    />
                                </Box>


                                <Grid container spacing={1.5} style={{ width: "100%", display: "grid" }}>

                                    {buttonDisable && (<Button variant="contained" sx={{ backgroundColor: "#5506bb", textTransform: "none", fontSize: "revert", fontWeight: "700", height: { xs: "22px", xl: "100%" } }} onClick={() => (handleAddToCart(value))}  > <img src={Cart1} alt="cart icon" style={{ width: "20px", marginRight: "8px" }} />
                                        Add To Cart</Button>)
                                    }

                                    <Grid container spacing={1} style={{ width: "100%", display: "grid" }}>
                                        <Typography sx={{ fontWeight: "500", fontSize: { xs: "x-small", xl: "100%" } }} >{value.name}</Typography>
                                        <Typography sx={{ color: "red", fontSize: { xs: "x-small", xl: "100%" } }} >Rs.{value.price}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                    }
                </Grid>
                {/* </div> */}
            </Box>
        </div>
    );
};

export default CardList;
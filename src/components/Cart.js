import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import deleteIcon from '../images/icons/deleteIcon.png'
import cartEmpty from '../images/icons/cartEmpty.png'

import { deleteFromCart, updateFromCart, subTotal } from '../redux/actions';
import { Products } from '../data/Products';
import CardTotal from './CardTotal';


export const QuantityInput = ({ quantity, onIncrement, onDecrement, typographyProps = {}, buttonProps = {}, marginProps = {} }) => (
    <Box display="flex"    >
        <div style={{ border: "1px solid black", width: { xs: "30px", sm: "80px", md: "60px", xl: "50px" }, height: { xs: "30px" } }} >
            <IconButton
                onClick={onDecrement}
                disabled={quantity <= 1}
                sx={{
                    color: "black",
                    borderRadius: "0",
                    '&:hover': { backgroundColor: "lightgray" },
                    borderRight: "1px solid black",
                    padding: { xs: "5px", md: "8px" },
                    ...buttonProps
                }}
            >
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" component="span" sx={{ mx: 2, minWidth: "24px", textAlign: "center", fontSize: { xs: "12px", md: "16px" }, ...typographyProps, ...marginProps }}>
                {quantity}
            </Typography>
            <IconButton
                onClick={onIncrement}
                sx={{
                    color: "white",
                    backgroundColor: "#DB4444",
                    borderRadius: "0",
                    '&:hover': { backgroundColor: "red" },
                    padding: { xs: "5px", md: "8px" },
                    ...buttonProps
                }}
            >
                <AddIcon />
            </IconButton>

        </div>
    </Box>
);

export const handleIncrement = (item) => {
    const updatedQuantity = Number(item.quantity) + 1;
    const unitPrice = parseFloat(item.price) / Number(item.quantity);
    const updatedItem = {
        ...item,
        quantity: updatedQuantity,
        price: (unitPrice * updatedQuantity).toString(),
        updateType: 'INC'
    };
    return updatedItem
};

export const handleDecrement = (item) => {
    if (Number(item.quantity) > 1) {
        const updatedQuantity = Number(item.quantity) - 1;
        const unitPrice = parseFloat(item.price) / Number(item.quantity);
        const updatedItem = {
            ...item,
            quantity: updatedQuantity,
            price: (unitPrice * updatedQuantity).toString(),
            updateType: 'DEC'
        };
        return updatedItem
    }
};

const Cart = () => {

    const cartList = useSelector((state) => state.cartList.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [deleteAlert, setDeleteAlert] = useState(false)


    const [checkedItems, setCheckedItems] = useState(
        cartList.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
    )

    const handleCheckBox = (item) => (event) => {
        const checked = event.target.checked
        setCheckedItems((prev) => ({
            ...prev,
            [item.id]: checked
        }))
        const keyAddedItem = { ...item, isChecked: checked }
        dispatch(subTotal(keyAddedItem))
    }

    const handleDeleteFromCart = (index) => {
        setDeleteAlert(true)

        setTimeout(() => {
            setDeleteAlert(false)
        }, 2000)
        dispatch(deleteFromCart(index))

    }

    const handleViewProduct = (value) => {
        const updatedItem = Products?.find((object) => (object?.id === value?.id))
        navigate('/productSpec', { state: updatedItem })
    }

    return (
        <>

            {cartList.length ?
                (<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>

                    <Box sx={{
                        flexGrow: 1,
                        border: "1px solid #ddd",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        marginBottom: "33px",
                        backgroundColor: "#5506bb",
                        color: "white"

                    }}>
                        <Toolbar>
                            <Grid container>
                                <Grid item
                                    xs={3.7}
                                    xl={3}
                                >
                                    <Typography component="div" sx={{ textAlign: 'left', fontSize: { xs: "12px", xl: "20px" }, fontWeight: 500 }}>
                                        Product
                                    </Typography>
                                </Grid>
                                <Grid item
                                    xs={3.6}
                                    xl={3}
                                >
                                    <Typography component="div" sx={{ textAlign: 'center', fontSize: { xs: "12px", xl: "20px" }, fontWeight: 500 }}>
                                        Price
                                    </Typography>
                                </Grid>
                                <Grid item
                                    xs={1.1}
                                    xl={3}
                                >
                                    <Typography component="div" sx={{ textAlign: 'center', fontSize: { xs: "12px", xl: "20px" }, fontWeight: 500 }}>
                                        Quantity
                                    </Typography>
                                </Grid>
                                <Grid item
                                    xs={3.6}
                                    xl={3}
                                >
                                    <Typography component="div" sx={{ textAlign: 'right', fontSize: { xs: "12px", xl: "20px" }, fontWeight: 500 }}>
                                        SubTotal
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Box>

                    {cartList?.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flexGrow: 1,
                                padding: { xs: "2px", xl: "16px" },
                                border: "1px solid #ddd",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                marginBottom: 2,
                            }}
                        >
                            <Grid container alignItems="center">

                                <Grid item
                                    xs={3.5}
                                    xl={3}
                                    sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "3%" }}>
                                    <Checkbox onChange={handleCheckBox(item)} checked={checkedItems[item.id] || false}
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: { xs: "16px", xl: "20px" },
                                            },
                                        }}
                                    />
                                    <Box sx={{ width: { xs: "50px", xl: "54px" }, height: { xs: "50px", xl: "54px" }, cursor: "pointer" }}>

                                        <img src={item.image} style={{ width: "100%", height: "100%" }} alt="product" onClick={() => handleViewProduct(item)} />
                                    </Box>
                                    <Typography component="div" sx={{ textAlign: 'left', color: "black", fontSize: { xs: "12px", xl: "20px" }, display: { xs: "none", lg: "block" } }}>
                                        {item.name}
                                    </Typography>

                                </Grid>

                                <Grid item
                                    xs={1.5}
                                    xl={0.11}

                                >

                                    <IconButton
                                        onClick={() => handleDeleteFromCart(item)}
                                    >
                                        <img src={deleteIcon} alt='deleteIcon'  ></img>
                                    </IconButton>

                                </Grid>


                                <Grid item
                                    xs={0.5}
                                    xl={2.85}
                                >

                                    <Typography component="div" sx={{ textAlign: 'center', color: "black", fontSize: { xs: "12px", xl: "20px" } }}>
                                        {item.price}
                                    </Typography>


                                </Grid>
                                <Grid item
                                    xs={5}
                                    xl={3}

                                >
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <QuantityInput
                                            quantity={item?.quantity}
                                            onIncrement={() => dispatch(updateFromCart(handleIncrement(item)))}
                                            onDecrement={() => dispatch(updateFromCart(handleDecrement(item)))}
                                            typographyProps={{ fontSize: { xs: "9px", md: "16px" } }}
                                            buttonProps={{ padding: { xs: "0px", md: "8px" } }}
                                            marginProps={{ mx: { xs: 1, xl: 2 } }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item
                                    xs={0}
                                    xl={3}
                                >
                                    <Typography component="div" sx={{ textAlign: { xs: "center", xl: 'right' }, color: "black", fontSize: { xs: "12px", xl: "20px" } }}>
                                        {item.price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}

                    <Box style={{ marginTop: "20px" }} >
                        <CardTotal />
                    </Box>
                    {deleteAlert && (
                        <div  style={{position:"fixed",bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 1000}} >
                        <Alert
                            severity="info"
                            sx={{
                                position: "absolute",
                                bottom: "10px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                justifyContent: "center",
                                width: {  xs:"15rem" , xl:"25rem"},
                                zIndex: 10,
                            }}
                        >
                            Item successfully deleted !
                        </Alert>
                        </div>
                    )}
                </div>)
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
                            <img src={cartEmpty} style={{ width: "100%", height: "100%" }} alt='cartEmpty' />
                        </Box>
                        <Typography
                            sx={{ fontSize: { xs: "22px", xl: "52px" } }}
                        >
                            Your Cart is Empty !
                        </Typography>

                    </div>
                )
            }
        </>
    );
};

export default Cart;

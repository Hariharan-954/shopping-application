import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

const CardTotal = () => {
    const subTotal = useSelector((state) => state.cartList.priceSubTotal);

    return (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Box style={{ display: 'flex', flexDirection: 'column' }} sx={{ width: { xs: "220px", xl: '470px' } }} >
                <Box
                    sx={{
                        gap: { xs: "6px", xl: '15px' },
                        display: 'flex',
                        flexDirection: 'column',
                        padding: { xs: "10px", xl: '20px' },
                        border: '2px solid',
                        borderRadius: '3px',
                    }}
                >
                    <Grid container>
                        <Grid item xs={5}>
                            <Typography component="div" sx={{ color: 'black', fontSize: { xs: "15px", xl: "20px" }, fontWeight: { xs: 600, xl: 500 } }}>
                                Cart Total
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Subtotal
                        </Typography>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Rs.{subTotal}
                        </Typography>
                    </Grid>
                    <Divider />

                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Shipping
                        </Typography>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Free
                        </Typography>
                    </Grid>
                    <Divider />

                    <Grid container sx={{ justifyContent: 'space-between', }}>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Total
                        </Typography>
                        <Typography component="div" sx={{ color: 'black', fontSize: { xs: "12px", xl: "17px" } }}>
                            Rs.{subTotal}
                        </Typography>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: { xs: "10px", xl: '20px' } }}>
                        <Button
                            sx={{
                                color: 'white',
                                backgroundColor: '#DB4444',
                                textTransform: 'none',
                                width: { xs: "10rem", xl: '16.25rem' },
                                height: { xs: "2rem", xl: '3.5rem' },
                                fontSize: { xs: "12px", xl: "16px" }
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default CardTotal;

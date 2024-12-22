import {React,useState} from 'react';
import Header from './Header';
import { Box } from '@mui/material';

const Frame = ({ children }) => {

    const [isBlurred, setIsBlurred] = useState(false);

    return (
        <div>
            <Header setIsBlurred={setIsBlurred} />
        <Box sx={{  
            display: "flex",
            marginTop: "23px",
            marginLeft: { xs: "10px", xl: "25px" },
            marginRight: { xs: "10px", xl: "25px" } ,
            filter: isBlurred ? "blur(5px)" : "none", 
            transition: "filter 0.3s ease-in-out", 
             }} >
                {children}
            </Box>
        </div>
    );
};
export default Frame;
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

import backgroundPic from '../images/background.jpg'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === "true"

    if (isAuthenticated) {
      navigate('/products', { replace: true })
    }

  }, [navigate])

  const handleSignIn = (event) => {
    event.preventDefault()
    const storedEmail = process.env.REACT_APP_EMAIL
    const storedPassword = process.env.REACT_APP_PASSWORD

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true")
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate('/products', { replace: true });
      }, 1000)
    }
    else {
      setPassword('')
      setEmail('')
      alert("Invalid username or password");
    }
  };

  // Prevent rendering the login form for authenticated users
  if (localStorage.getItem('isAuthenticated') === "true") {
    return (
      <Box sx={{ display: "flex", position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress sx={{ color: "#5506bb" }} />
      </Box>
    );
  }

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", position: "absolute", top: "50%", left: "50%" }}>
          <CircularProgress sx={{ color: "#5506bb" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            inset: 0,
            backgroundImage: `url(${backgroundPic})`,
            position: "absolute",
            backgroundSize: {
              xs: "auto 100%",
              sm: "cover",
            },
            backgroundPosition: {
              xs: "center",
              sm: "top",
            },
            backgroundRepeat: "no-repeat",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              backgroundColor: "white",
              position: "absolute",
              borderRadius: "10px",
              display: "flex",
              width: { xs: "63%", xl: "24%" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: { xs: "5%", xl: "8%" },
              }}
            >
              <Grid container spacing={2} style={{ width: "100%" }}>
                <Typography sx={{ fontWeight: 500, fontSize: { xs: "18px", xl: "23px" } }}>
                  Nice to see you again
                </Typography>
                <Grid container spacing={1.5} style={{ width: "100%" }}>
                  <Box component="input" sx={{ width: "100%", height: { xs: " 22px", xl: "45px" }, borderRadius: "5px", border: "none", outline: "none", backgroundColor: "#f2f2f2", paddingLeft: "13px", fontSize: { xs: "small", xl: "medium" } }}
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Box component="input" sx={{ width: "100%", height: { xs: " 22px", xl: "45px" }, borderRadius: "5px", border: "none", outline: "none", backgroundColor: "#f2f2f2", paddingLeft: "13px", fontSize: { xs: "small", xl: "medium" } }}
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Button variant="contained" sx={{ width: "100%", background: "#5506bb", height: { xs: "23px", xl: "33px" } }} onClick={(event) => handleSignIn(event)}  >
                  Sign in
                </Button>
              </Grid>

            </Box>
          </Box>
        </Box>
        )
      }
    </>
  );
};

export default Login;

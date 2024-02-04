import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';

const Home = () => {
    // const handleLogin = (platform) => {
    //     // Handle login logic for the selected platform
    //     console.log(`Logging in with ${platform}`);

    // };

    const facebookLoginHandler = async () => {
        console.log('Logging in with facebook');
        window.open('http://localhost:8000/auth/facebook', '_self');
        // const json = await response.json();
    }

    const twitterLoginHandler = async () => {
        console.log('Logging in with twitter');
        window.open('http://localhost:8000/auth/twitter', '_self');
        // const json = await response.json();
        // textTweetHandler();
    }

    const instaLoginHandler = async () => {
        console.log('Logging in with insta');
        window.open('http://localhost:8000/auth/instagram', '_self');
    }


    const googleLoginHandler = async () => {
        window.open('http://localhost:8000/auth/google', '_self');
        // const json = await response.json();
    }

    // Assuming you have a function to extract query parameters from the URL


    // Invoke this function on button click or whatever other use case
    const setupInsta = async () => {
        try {
            let appId = "748058700261161";
            let redUri = 'https://localhost:3000/Mains';

            // Open Instagram authorization URL
            let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
            window.open(url, "_blank").focus();

            // Wait for some time (for the user to authorize)
            await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the delay as needed

            let instagramToken = "IGQWRNSXFzVHlVU3pkSGlRd0hIaWVPX2RCQWdoblFPZAXJDTmhBS3M5MHY2c3BjdjBCcEdwS1ZAWTDdxWFp6VWhMQVAwZAlhOZAXJvT0FrYnJfbkdpc2taOFllTERGb21DYm04cUJzQ3ZAVdE9YTFFvdzhTb1ppNFc0NHMZD";
            console.log(instagramToken);

            // Use the obtained Instagram token to fetch details
            try {
                let resp = await axios.get(`https://graph.instagram.com/me/media?fields=media_type,permalink,media_url&access_token=${instagramToken}`);
                resp = resp.data;
                let instaPhotos = resp.data.filter(d => d.media_type === "IMAGE").map(d => d.media_url);
                // Got insta photos
                console.log("Instagram Photos:", instaPhotos);
            } catch (e) {
                console.log("Error fetching Instagram details:", e.response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontFamily: 'Arial, sans-serif',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Replace with your desired background style
                color: 'white',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to Your App
            </Typography>
            <Typography variant="body1" gutterBottom>
                Choose a login method:
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ marginY: 1 }}
                onClick={() => facebookLoginHandler()}
            >
                Login with Facebook
            </Button>

            <Button
                variant="contained"
                style={{ backgroundColor: '#00acee', color: 'white' }}
                sx={{ marginY: 1 }}
                onClick={() => twitterLoginHandler()}
            >
                Login with Twitter
            </Button>


            <Button
                variant="contained"
                color="secondary"  
                sx={{ marginY: 1, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' } }}
                onClick={() => googleLoginHandler()}
            >
                Login with Google
            </Button>

            <Button
                variant="contained"
                color="secondary"
                sx={{ marginY: 1 }}
                onClick={() => setupInsta()}
            >
                Login with Instagram
            </Button>

        </Box>
    );
};

export default Home;
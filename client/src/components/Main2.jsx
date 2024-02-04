import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Main2 = () => {

    const handleLogout = async () => {
        document.cookie=""
        window.open('http://localhost:8000/auth/twitter/logout','_self');
    }
  
    const textTweetHandler = async () => {
        try {
          const response = await fetch('http://localhost:8000/post/tweet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // You can add additional headers or body if needed
          });
      
          if (response.ok) {
            console.log('Text tweet sent successfully!');
          } else {
            console.error('Failed to send text tweet');
          }
        } catch (error) {
          console.error('Error sending text tweet:', error);
        }
      };
  const handlePostTweet = () => {
    // Implement your logic for posting a tweet
    alert('Tweet posted successfully');
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.heading}>
        You are Successfully Logged in to twitter
      </Typography>
      <div style={styles.buttonContainer}>
        <Button variant="outlined" color="primary" onClick={() => handleLogout()}style={styles.button}>
          Logout
        </Button>
        <Button variant="contained" color="primary" onClick={() => textTweetHandler()} style={styles.button}>
          Post a Tweet
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    fontSize: '16px',
  },
};

export default Main2;

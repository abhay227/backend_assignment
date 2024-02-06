import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Main2 = () => {
  const [user, setUser] = useState({ name: "", provider: "", id: "", email: "" });
  const [tweetText, setTweetText] = useState('');

  
 

  const handleLogout = async () => {
    document.cookie = '';
    window.open('http://localhost:8000/auth/twitter/logout', '_self');
  };

  const textTweetHandler = async () => {
    console.log(tweetText);
    try {
      const response = await fetch('http://localhost:8000/post/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet: tweetText }),
      });

      if (response.ok) {
        console.log('Text tweet sent successfully!');
        alert('Tweet posted successfully');
        setTweetText(''); // Clear tweet text after posting
      } else {
        console.error('Failed to send text tweet');
        alert('Failed to post tweet. Please try again.');
      }
    } catch (error) {
      console.error('Error sending text tweet:', error);
      alert('Error posting tweet. Please try again.');
    }
  };

 

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      textTweetHandler();
    }
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.heading}>
        You are Successfully Logged in to Twitter
      </Typography>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your tweet here..."
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          onKeyPress={handleKeyPress}
          style={styles.input}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={textTweetHandler}
          style={styles.button}
        >
          Post a Tweet
        </Button>
      </div>
    
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogout}
        style={styles.button}
      >
        Logout
      </Button>
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
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    marginRight: '10px',
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '20px', // Add rounded corners
    boxShadow: 'none', // Remove default button shadow
    fontWeight: 'bold', // Increase font weight
    textTransform: 'none', // Prevent uppercase text
    padding: '12px 24px', // Increase padding for a larger button
  },
};

export default Main2;

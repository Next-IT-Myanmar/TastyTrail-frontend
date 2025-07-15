export const getTokenFromRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
  
    // Replace with your refresh API endpoint
    const response = await fetch('https://tastytrail-backend-production.up.railway.app/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
  
    if (!response.ok) return null;
  
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data;
  };
  
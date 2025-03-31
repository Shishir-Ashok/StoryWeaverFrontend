export const checkAuth = () => {
    try {
        const auth = fetch('http://localhost:3000/profile', {
            method: 'GET',
            credentials: 'include', // include cookies
        }).then((response) => {
            response.json().then((userInfo) => {
                return userInfo.id? userInfo : false; 
                // if user is authenticated, the userInfo will contain the id, otherwise we return false
            });
        });
    } 
    catch (error) {
        console.error("Error while checking auth:", error);
        return false;
    }
};
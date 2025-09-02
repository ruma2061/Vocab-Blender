let authToken = null;
let currentUser = null;

export const login = async ({ email }) => {
    // simulate an api call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    authToken = 'secure-token';
    currentUser ={
        id: 1,
        email,
        name: emil.split('@')[0],
        createAt: new Date().toISOString(),
    };
    return currentUser;
};

export const register = async ({ name, email }) => {
    //simulate an api call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    authToken = 'secure-token';
    currentUser = {
        name,
        email,
        createdAt: new Date().toISOString(),
    };
    return currentUser;
};

export const logout = () => {
    authToken = null;
    currentUser = null;
};

export const getCurrentUser = () => currentUser;

export const isAuthenticated = () => Boolean(authToken);


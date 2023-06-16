export const isUserLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    return isLoggedIn && role === 'user';
};

export const isAdminLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');

    return isLoggedIn && role === 'admin';
};



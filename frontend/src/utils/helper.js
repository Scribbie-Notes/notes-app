export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    let initials = "";

    if (words.length > 0) {
        initials += words[0][0]; // First initial
    }
    
    if (words.length > 1) {
        initials += words[1][0]; // Second initial, if available
    }

    return initials.toUpperCase();
}

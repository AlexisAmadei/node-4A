function verifyEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function verifyPassword(password) {
    const passwordRegex = /^.{5,}$/;
    return passwordRegex.test(password);
}

module.exports = {
    verifyEmail,
    verifyPassword
};
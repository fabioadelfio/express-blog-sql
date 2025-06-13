function notFound (req, res, next) {
    const error = new Error (`Page not found`);
    error.statusCode = 404;
    throw error;
};

module.exports = notFound;
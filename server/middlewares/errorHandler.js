const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = 'Internal Server Error'
    if (err.name === 'SequelizeUniqueConstraintError' || err.name === 'SequelizeValidationError') {
        status = 400;
        message = err.errors[0].message;
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'Unauthorized') {
        status = 401;
        message = 'Invalid token or unauthorized access';
    }

    if (err.name === 'Forbidden') {
        status = 403;
        message = 'Forbidden access';
    }

    if (err.name === 'NotFound') {
        status = 404;
        message = 'Data is not found';
    }

    if (err.name === 'LoginError') {
        status = 401;
        message = 'Invalid email or password';
    }

    if (err.name === 'BadRequest') {
        status = 400;
        message = 'Please check your input';
    }

    if (err.name === 'Conflict') {
        status = 409;
        message = 'Data already exists';
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler
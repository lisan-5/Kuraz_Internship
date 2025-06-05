class ApiResponse {
  constructor(res) {
    this.res = res;
  }

  success(data, statusCode = 200) {
    return this.res.status(statusCode).json({
      success: true,
      data
    });
  }

  error(message, statusCode = 400) {
    return this.res.status(statusCode).json({
      success: false,
      error: message
    });
  }
}

module.exports = ApiResponse;
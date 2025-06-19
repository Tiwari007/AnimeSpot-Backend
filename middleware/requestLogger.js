// Request logging middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Log request body for POST/PUT requests (excluding sensitive data)
  if ((method === 'POST' || method === 'PUT') && req.body) {
    const logBody = { ...req.body };
    // Remove sensitive fields from logs
    if (logBody.password) logBody.password = '***';
    if (logBody.email) logBody.email = logBody.email.replace(/(.{2}).*(@.*)/, '$1***$2');
    
    console.log(`[${timestamp}] Request Body:`, logBody);
  }

  next();
};

module.exports = requestLogger;

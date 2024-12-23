#





// Example logger usage:
```ts
import { logger } from '../utils/logger';

// Usage in your application
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.http('This is an HTTP message');
logger.debug('This is a debug message');

// With additional metadata
logger.info('User logged in', { userId: 123, timestamp: new Date() });

// With error objects
try {
  throw new Error('Something went wrong');
} catch (error) {
  logger.error('Error occurred:', error);
}
```
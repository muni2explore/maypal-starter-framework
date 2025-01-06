import 'reflect-metadata';
import './di/container';  // Import container initialization first
import app from './app';
import { config } from './config/environment';
import { logger, stream } from './utils/logger';
import morgan from 'morgan';

// Use morgan with our logger stream
app.use(morgan('combined', { stream }));
const startServer = () => {
    try {
        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();

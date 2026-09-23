require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	try {
		// Verify database credentials before accepting API traffic.
		await sequelize.authenticate();
		// Create/update tables from models while learning (later use migrations).
		await sequelize.sync();
		console.log('Database connected and models synced');

		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (error) {
		// Stop early if DB is unavailable so the API does not run in a broken state.
		console.error('Unable to start server:', error.message);
		process.exit(1);
	}
};

startServer();
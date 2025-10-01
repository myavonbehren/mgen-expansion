const { connectToDatabase } = require('./config/db');

async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

startServer();
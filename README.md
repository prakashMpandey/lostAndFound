# Lost and Found

A web application that allows users to publish lost items or items they have found. Other users can view these posts and provide assistance or information to help recover or return the items.

## Features

- Publish lost items with details and images.
- Publish found items with details and images.
- Search and browse through lost and found items.
- Secure user authentication and authorization.
- Manage user profiles and posts.

## Technologies Used

- **MERN Stack**: MongoDB, Express.js, React, Node.js
- **Cloudinary**: For image storage and management
- **Multer**: Middleware for handling file uploads
- **JWT**: JSON Web Tokens for secure authentication
- **Bcrypt**: For hashing passwords
- **tailwind**: for styling

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/prakashMpandey/lost-and-found.git
    ```
2. Navigate to the project directory:
    ```bash
    cd lostAndFound
    ```
3. Install server-side dependencies:
    ```bash
    
    npm install
    ```
4. Install client-side dependencies:
    ```bash
    cd ../frontend/lostFound
    npm install
    ```

## Configuration

1. Create a `.env` file in the `src` directory with the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=ANY SECRET STRING
    ACCESS_TOKEN_EXPIRY=ANY EXPIRY TIME
    REFRESH_TOKEN_SECRET=ANY SECRET STRING
    REFRESH_TOKEN_EXPIRY=ANY EXPIRY TIME
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    
2. Replace placeholder values with your actual configuration details.

## Usage

1. Start the backend server server:
    ```bash
    cd 
    npm run dev
    ```
2. Start the client:
    ```bash
    cd frontend/lostFound
    npm start
    ```
3. Open your browser and navigate to `http://localhost:5173` to use the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- GitHub: [@prakashMpandey](https://github.com/prakashMpandey)


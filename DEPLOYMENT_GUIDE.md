# Scribbly Deployment Guide for Vercel

## Prerequisites

- A Vercel account
- A GitHub repository with your Scribbly project code
- MongoDB Atlas account (for the database)

## Step 1: Configure Environment Variables

### Server Environment Variables

Add these to your Vercel project settings for the server deployment:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT token encryption
- `PORT`: Set to 3000 (though Vercel will manage ports automatically)
- `CLIENT_URL`: The URL of your deployed client (after you deploy the frontend)

### Client Environment Variables

Add these to your Vercel project settings for the client deployment:

- `VITE_BACKEND_URI`: The URL of your deployed server API (without trailing slash)

## Step 2: Deploy the Backend

1. Import your GitHub repository to Vercel
2. Configure the project settings:
   - Root Directory: `server`
   - Framework Preset: `Node.js`
   - Build Command: `npm run build`
   - Output Directory: `.`
   - Install Command: `npm install`
3. Add environment variables
4. Deploy!

## Step 3: Deploy the Frontend

1. Import your GitHub repository to Vercel (as a separate project)
2. Configure the project settings:
   - Root Directory: `client`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Add environment variables (make sure `VITE_BACKEND_URI` points to the deployed backend URL)
4. Deploy!

## Step 4: Update CORS Configuration

Once both the frontend and backend are deployed, make sure to:

1. Add your frontend domain to the CORS allowed origins in the server's `.env` file
2. Redeploy the backend if necessary

## Troubleshooting

### CORS Issues

- Check that the correct origin is included in the allowedOrigins list
- Verify that the URL doesn't have a trailing slash

### API Connection Issues

- Check that you're not using double slashes in URL paths
- Verify environment variables are set correctly
- Check browser console for error messages

### Deployment Fails

- Check the build logs in Vercel
- Make sure all dependencies are properly installed
- Verify your vercel.json configuration

## Test Your Deployment

1. Visit your frontend URL
2. Try registering a new user
3. Test login functionality
4. Create and save a drawing

# Use the official Node.js image as a base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install pm2 -g

# Copy the rest of the application code
COPY . .

# Expose the port that your application will run on
EXPOSE 4500 

# Use PM2 to start the application directly
CMD ["pm2-runtime", "index.js", "--name", "backend", "--watch", "--env", "production"]

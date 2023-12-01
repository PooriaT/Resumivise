# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

#Buidling the project
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Command to run on container start
CMD ["npm", "run", "start"]

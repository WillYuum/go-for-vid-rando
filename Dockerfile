# Use an official Rust image as the base image
FROM rust:latest as builder

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Create a new directory for the Tauri project
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install the npm dependencies
RUN npm install

# # Build your Tauri project
# RUN cd src-tauri && cargo build --release --locked

# Set the base image to a smaller one for runtime
# FROM debian:buster-slim

# Copy the Tauri project files from the builder stage
# COPY --from=builder /app/src-tauri/target/release/{go-for-vid-rando} /app/{go-for-vid-rando}

# Specify the startup command
# CMD ["/app/{go-for-vid-rando}"]

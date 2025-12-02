# Use an official Python base image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /api

# Create virtual environment
RUN python3 -m venv /opt/.venv

# Activate virtual environment
ENV PATH="/opt/.venv/bin:$PATH"

# Copy the rest of your application code
COPY ./ /api

# Install Python dependencies
RUN pip3 install -r requirements.txt

#Install chrome for web scraping
RUN playwright install chrome

# Expose the port your application listens on
EXPOSE 5000 5432 8080

# Define the command to run your application
CMD ["uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "5000"]
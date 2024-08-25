import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Configuration
smtp_server = os.getenv('SMTP_SERVER')
smtp_port = int(os.getenv('SMTP_PORT'))
smtp_username = os.getenv('SMTP_USERNAME')
smtp_password = os.getenv('SMTP_PASSWORD')
to_email = os.getenv('TO_EMAIL')
from_email = os.getenv('FROM_EMAIL')
check_url = os.getenv('CHECK_URL')
status_file = 'status.txt'

# Function to send email
def send_email(subject, body):
    try:
        message = MIMEMultipart()
        message['From'] = from_email
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(message)
            print(f"Email sent: {subject}")
    except Exception as e:
        print(f"Failed to send email: {e}")

def check_website(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return "UP"
        else:
            return "DOWN"
    except requests.RequestException as e:
        return "DOWN"

def main():                                                                                                                                                                                                         
    current_status = check_website(check_url)
    try:
        with open(status_file, 'r') as file:
            previous_status = file.read().strip()
            
    except FileNotFoundError:
    
        previous_status = "UNKNOWN"

    if current_status != previous_status:
        if current_status == "UP":
            send_email("Website Up Alert", f"The website {check_url} is back up and running.")
        elif current_status == "DOWN":
            send_email("Website Down Alert", f"The website {check_url} is currently down.")

        with open(status_file, 'w') as file:
            file.write(current_status)

    else:
        print(f"No status change detected. Current status: {current_status}")

if __name__ == "__main__":
    main()

# Richard Lechko - Resume

## Overview

Welcome to the repository for my personal website! This site serves as an interactive extension of my resume, showcasing my skills, projects, and experiences in a dynamic and colorful format.

I utilized AWS Free Tier EC2 to host my website, with Namecheap for DNS management. By configuring AWS services, including Load Balancers and Target Groups, I ensured access to my site via both HTTP and HTTPS protocols. Aliases for various subdomains streamline DNS management, achieving comprehensive web presence while minimizing costs.

## Features

- **Colorful Design**: Transformed a traditional black-and-white resume into a vibrant and visually appealing website.
- **Interactive Elements**: Includes engaging animations, interactive elements, and intuitive navigation for an immersive user experience.
- **Responsive Layout**: Designed to adapt seamlessly to various screen sizes, ensuring accessibility across devices.
- **Content Sections**: Organized content into clear sections such as About Me, Projects, Skills, and Contact.
- **Real-Time Updates**: Features a monitoring script that checks the website's status and sends notifications on status changes.

## Technologies Used

- **Frontend**: HTML5, CSS3 (including CSS animations), JavaScript
- **Backend**: NodeJS, Express.js
- **APIs**: Custom APIs for dynamic content
- **Version Control**: Git
- **Deployment**: AWS Free Tier (EC2, Route 53, Load Balancer, Target Groups)
- **Security**: SSL/TLS for HTTPS, secure environment variables

## Getting Started

To view my website, visit: [https://www.richardlechko.com](https://www.richardlechko.com). Feel free to explore the different sections and interact with the content.

To run the website locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd your-repo
   ```

3. **Set Up the Environment**:

   - Ensure you have Python and NodeJS installed.
   - Create and activate a Python virtual environment if applicable.
   - Install required NodeJS packages using `npm install` or `yarn install`.

4. **Run the Application**:
   - Start the backend server if applicable:
     ```bash
     npm start
     ```
   - Open the `index.html` file in your web browser to view the site locally.

## Contributions

Contributions are welcome! If you have suggestions for improvements, spot a bug, or would like to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to modify and distribute the code for personal or commercial use.

## Contact

If you have any questions or would like to get in touch, feel free to reach out to me at [richardlechko@gmail.com](mailto:richardlechko@gmail.com).

## Additional Information

- **Monitoring Script**: Includes a script to monitor the website's status and notify of any changes.
- **Environment Variables**: Ensure to set up your environment variables as outlined in the `.env.example` file.

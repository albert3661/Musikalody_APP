# Musikalody APP

Musikalody APP is a dynamic quiz application that uses both online and offline modes to deliver trivia questions about music. It pulls questions from an OpenAI API when online and accesses a static dataset when offline, allowing users to test their music knowledge under any circumstances.

## Features

- **Dual Mode Functionality**: Fetches live quiz questions from an API when online; uses a pre-prepared set of static questions when offline.
- **Interactive Quiz Experience**: Provides immediate feedback on answers, enhancing the learning experience.
- **Progress Tracking**: Displays the current question number and total number of questions in the quiz.
- **Timed Questions**: Each question is timed, adding excitement and a layer of challenge.

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenAI API

## Setup Instructions

### Clone the Repository

To get started with the Musikalody APP, clone the repository to your local machine using:

```bash
git clone https://github.com/albert3661/Musikalody_APP.git ```
`cd Musikalody_APP`
## API Key Configuration
Obtain an API key from OpenAI.

Create a .env file in the root directory of the project.


Copier le code

`OPENAI_API_KEY='Your_OpenAI_API_Key_Here`
Running the Application Locally
If you don't have a setup that includes a live server, you can run a simple HTTP server using Python:

For Python 3.x:

bash
Copier le code
`python -m http.server`
Then, access the application by navigating to http://localhost:8000 in your web browser.

## Usage Guide
Start the Quiz: Click the "Start" button on the homepage to initiate the quiz.
Answer Questions: Select answers from the multiple-choice options provided for each question.
Navigate through the Quiz: Use the "Next" button to move to the next question, or the "Restart" button to restart the quiz at any time.
Online/Offline Detection
Online Mode: The application fetches new questions from the OpenAI API.
Offline Mode: The application uses stored static questions, ensuring functionality regardless of internet connectivity.
Contributing
Contributions to Musikalody APP are welcome! Please fork the repository, make your changes, and submit a pull request for review.


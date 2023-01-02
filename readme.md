# Chattix - Yet Another Cross-Platform Chat App

Chattix is a cross-platform chat app that allows users to communicate with their friends and family, share images and locations, and even connect with new people. As the sole developer on the project, I was responsible for building the app from the ground up using React Native, Expo, and Google Firebase.

One of the main challenges I faced was integrating the various Firebase services, including authentication, cloud storage, and cloud firestore. It was a steep learning curve, but I was able to overcome it through trial and error and a lot of documentation reading.

Another challenge was ensuring that the app was compatible with both Android and iOS devices. This required a lot of testing on various emulators and devices, as well as debugging and fixing any issues that arose.

One of the features that I am particularly proud of is the offline functionality. I wanted to make sure that users could still access their messages and send new ones, even if they didn't have an internet connection. To achieve this, I implemented local storage and syncing with the server once an internet connection was established. It was a great learning experience and I am happy with how the feature turned out.

Overall, working on the Chattix project was a fantastic learning opportunity for me. It allowed me to improve my skills in mobile development and cloud computing, and also allowed me to use my problem-solving and creative thinking skills. I am confident that this project will be a valuable addition to my portfolio and help me continue to grow as a developer.

* [Features](https://github.com/Digital-Solver/Chattix/readme.md#Features)
* [Technologies](https://github.com/Digital-Solver/Chattix/readme.md#Technologies)
* [Installation](https://github.com/Digital-Solver/Chattix/readme.md#Installation)
* [Usage](https://github.com/Digital-Solver/Chattix/readme.md#Usage)
* [Configuration](https://github.com/Digital-Solver/Chattix/readme.md#Configuration)
* [Materials](https://github.com/Digital-Solver/Chattix/readme.md#Materials)
* [Contribution Guideilnes](https://github.com/Digital-Solver/Chattix/readme.md#Contribution)
* [License](https://github.com/Digital-Solver/Chattix/readme.md#License)
* [Contact](https://github.com/Digital-Solver/Chattix/readme.md#Contact)
* [Resources](https://github.com/Digital-Solver/Chattix/readme.md#Resources)

## Features
* Homepage: 
  * Customise your chat with a name and background colour
* Chat Page:
  * Easily join a chat room to quickly start talking to friends and family
  * Send messages to exchange the latest news
  * Share images to show friends what you're currently doing
  * Share location with friends to show them where you are
  * Read messages offline to reread conversations at any time
  * Compatible with screen readers for users with visual impairments
  
 ### User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Technologies
* React Native
* Native APIs (Media Library, Camera, and Geolocation)
* Expo
* Google Firestore Database
* Google Firebase authentication
* Gifted Chat library

## Installation: How to use Chattix

1. Install the latest version of Node.js from the official website (https://nodejs.org/). Follow the prompts to complete the installation process.
2. Install the Expo CLI by running the following command in your terminal: `npm install -g expo-cli`
3. Download and install Android Studio from the official website (https://developer.android.com/studio). Follow the prompts to complete the installation process.
4. In Android Studio, set up an Android Virtual Device (AVD) by going to `Tools > AVD Manager`.
5. Click on the `Create Virtual Device` button and select a device from the list.
6. Choose a system image and follow the prompts to set up the AVD.
7. Start the AVD by clicking on the `Play` button in the AVD Manager.
8. Clone the repository: `git clone https://github.com/Digital-Solver/Chattix.git`
9. Navigate to the project directory: `cd Chattix`
10. Install the dependencies: `npm install`
11. In the root folder, run `npm run start`
12. Allow Expo Go to be installed/updated on the emulator. This may involve installing the  app from the Google Play Store or allowing the app to update.
13. Open Expo Go on the emulator and run the app.
14. Chat to your friends!

## Usage
1. Run the development server: `expo start`
2. Open the app in the Expo app on your phone or in the emulator on your computer
3. Register and sign in with Google Firebase
4. Start chatting with friends and sharing images and location!

## Configuration
You can customize the chat screen background color in the App's home page.

## Materials
* A design specification to build the interface for
* User stories to keep actions focused
* Kanban board to keep the project on track
* An Android emulator with the Expo app installed

## Contribution
To contribute to the project, follow these steps:

1. Fork the repository
2. Create a new branch: git checkout -b new-feature
3. Make your changes and commit them: git commit -m 'Add new feature'
4. Push the branch: git push origin new-feature
5. Create a pull request

## Licence
This project is licensed under the [MIT Licence](https://opensource.org/licenses/MIT).

## Contact
If you have any questions or suggestions, feel free to contact the project maintainer at kerr(dot)digitalsolver@gmail.com .

## Resources
[React Native Documentation](https://reactnative.dev/docs/getting-started)
[Expo Documentation](https://docs.expo.io/)
[Google Firestore Documentation](https://firebase.google.com/docs/firestore)
[Gifted Chat Documentation](https://github.com/FaridSafi/react-native-gifted-chat)

## Core Features: Why use this app
- Homepage: Customise your chat with a name and background colour
- Chat Page: Talk to your friends and send photos or location

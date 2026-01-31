# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Introduction

CoffeeCup is a mobile application designed for coffee enthusiasts to easily order their favorite drinks, manage their shopping cart, track orders, and redeem loyalty rewards. Built with modern React Native technologies, it offers a smooth and intuitive user experience across iOS and Android devices.

## Project Structure

The project is organized as follows:

- `app/`: Main application screens and file-based routing using Expo Router.
- `assets/`: Static resources including images, fonts, and other media files.
- `components/`: Reusable UI components, grouped by feature (e.g., HomeScreen, MyCart, Orders).
- `database/`: SQL scripts for setting up and managing the app's local database.
- `scripts/`: Utility scripts for project maintenance, such as resetting the project.

## Function

CoffeeCup provides the following key functionalities:

- **Browse and Order**: Users can explore a variety of coffee drinks and customize their orders.
- **Cart Management**: Add, remove, and modify items in the shopping cart.
- **Order Tracking**: View ongoing and historical orders.
- **Loyalty Program**: Earn points on purchases and redeem them for rewards.
- **User Profile**: Manage personal information and preferences.

## Techstack

- **Framework**: Expo, React Native
- **Language**: TypeScript
- **Routing**: Expo Router
- **Database**: Expo SQLite
- **Animations**: React Native Reanimated
- **Icons**: Expo Vector Icons
- **Linting**: ESLint with Expo configuration

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

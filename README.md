# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Introduction

CoffeeCup is a mobile application designed for coffee enthusiasts to easily order their favorite drinks, manage their shopping cart, track orders, and redeem loyalty rewards. Built with modern React Native technologies, it offers a smooth and intuitive user experience across iOS and Android devices.

## Project Structure

The project is organized as follows:

- `app/`: Main application screens and file-based routing using Expo Router.
  - `(tabs)/`: Tab-based navigation with screens for home, search, rewards, and orders.
  - Individual screens: Details, MyCart, OrderSuccess, Profile, Redeem.
- `assets/`: Static resources including images, fonts, and other media files.
- `components/`: Reusable UI components, grouped by feature:
  - `Checkout/`: Components for order success and checkout process.
  - `Details/`: Components for coffee details, including image, info, options selector, quantity selector, and cart preview.
  - `HomeScreen/`: Components for the home tab, including header, coffee list, loyalty card, and buttons.
  - `MyCart/`: Components for cart management, including item display, total bar, and checkout.
  - `Orders/`: Components for viewing ongoing and historical orders.
  - `Profile/`: Components for user profile viewing and editing.
  - `Rewards/`: Components for loyalty badges and reward redemption.
  - `Search/`: Components for searching drinks, favorite orders, and recommendations.
  - `Welcome/`: Welcome screen component.
- `database/`: SQL scripts for setting up and managing the app's local database.
- `scripts/`: Utility scripts for project maintenance, such as resetting the project.

## Function

CoffeeCup provides the following key functionalities:

- **Browse and Order**: Users can explore a variety of coffee drinks and customize their orders with options like size, ice level, and shot type.
- **Cart Management**: Add, remove, and modify items in the shopping cart with quantity controls.
- **Order Tracking**: View ongoing and historical orders with status updates.
- **Loyalty Program**: Earn points on purchases and redeem them for rewards and badges.
- **User Profile**: Manage personal information and preferences.
- **Search**: Find favorite drinks and get recommendations.

## Database Setup

The app uses Expo SQLite for local data storage. The database schema includes:

- `Coffee`: Stores coffee items with details like name, type, price, image, and loyalty points.
- `Customer`: User profiles with name, email, address, and loyalty points.
- `Orders`: Current orders with customization options (shot, size, ice, temperature).
- `OrderHistory`: Completed orders with status tracking.

To set up the database:
1. The `CodeCup.sql` file contains the schema and initial data.
2. The app loads the database from `database/CodeCup.db` using `SQLiteProvider` in the root layout.
3. Use `Reset.sql` to drop tables if needed for a fresh start.

## App Flow

1. **Welcome**: New users see the welcome screen.
2. **Home Tab**: Browse featured coffees, view loyalty card, and access main features.
3. **Details Screen**: Select a coffee to view details, customize options, and add to cart.
4. **MyCart Screen**: Review cart items, adjust quantities, and proceed to checkout.
5. **Order Success**: Confirmation after placing an order, with option to view order history.
6. **Orders Tab**: View ongoing and past orders.
7. **Rewards Tab**: Check loyalty points, badges, and redeem rewards.
8. **Search Tab**: Search for drinks, view favorites, and see recommendations.
9. **Profile Screen**: Edit user information and preferences.

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

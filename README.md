# react-native-offline-handler

A queue system for handling HTTP requests in React Native when the device is offline.

## Features ✨

- **Stores offline requests** when there is no connection.
- **Automatically retries** requests when the connection is restored.
- **Uses AsyncStorage** for data persistence.
- **Compatible with React Native and Expo**.

## Installation 🚀

Install the library with:

```sh
npm install react-native-offline-handler
# or
yarn add react-native-offline-handler
```

Also, make sure you have the following dependencies installed:

```sh
yarn add @react-native-async-storage/async-storage @react-native-community/netinfo cross-fetch
```

## Usage 📖

Import and use `fetchWithQueue` in your code:

```ts
import { fetchWithQueue } from "react-native-offline-handler";

const sendData = async () => {
  await fetchWithQueue("https://api.example.com/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "value" })
  });
};
```

## How It Works ⚙️

1. When the device is **online**, `fetchWithQueue` sends the request normally.
2. If the device is **offline**, the request is stored in `AsyncStorage`.
3. When the connection is restored, the queued requests are automatically processed.

## Connection Events 📡

The system monitors connection changes using `NetInfo`, retrying stored requests when the device is back online.

## License 📜

MIT

---

💡 Feel free to contribute and improve this library! 🚀

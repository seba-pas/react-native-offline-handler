import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import fetch from 'cross-fetch';

type RequestData = {
  url: string;
  options: RequestInit;
};

// Guarda requests en cola cuando no hay conexión
export const fetchWithQueue = async (
  url: string,
  options: RequestInit
): Promise<Response | void> => {
  const isConnected = (await NetInfo.fetch()).isConnected;

  if (isConnected) {
    return fetch(url, options);
  } else {
    const queue = JSON.parse(
      (await AsyncStorage.getItem('offlineQueue')) || '[]'
    ) as RequestData[];
    queue.push({ url, options });
    await AsyncStorage.setItem('offlineQueue', JSON.stringify(queue));

    // Retornamos `undefined` explícitamente para evitar el error
    return undefined;
  }
};

// Procesa la cola cuando hay conexión
const processQueue = async () => {
  const queue = JSON.parse(
    (await AsyncStorage.getItem('offlineQueue')) || '[]'
  ) as RequestData[];

  for (let request of queue) {
    try {
      await fetch(request.url, request.options);
    } catch (error) {
      console.log('Error reintentando request:', error);
    }
  }

  await AsyncStorage.removeItem('offlineQueue');
};

// Detecta cambios de conexión y procesa la cola
NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    processQueue();
  }
});

import { TOKEN } from '../constants/app';
import { AsyncStorage } from "react-native"

export async function saveToken(token: string) {
  await AsyncStorage.setItem(`${TOKEN}`, token);
}

export async function deleteToken() {
  AsyncStorage.clear();
}

export async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem(`${TOKEN}`);
}

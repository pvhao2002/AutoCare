import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'autocare_token';

export async function loginUser(token: string) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function logoutUser() {
    await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
}

export async function getUserToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
}

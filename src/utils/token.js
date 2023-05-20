import axios from 'axios';
import Cookies from 'js-cookie'
import { NEXT_PUBLIC_API_URL } from '@/constants/api';

export const refresh = async (token_name, refresh_token_name, router) => {
  const token = Cookies.get(token_name);
  const refresh_token = Cookies.get(refresh_token_name);

  if(!token || !refresh_token) {
    router.replace({ pathname: '/login' });
  }

  const refreshData = {
    token: token,
    refresh_token: refresh_token
  }

  try {
    const new_token = await axios.post(`${NEXT_PUBLIC_API_URL}/auth/refresh`, refreshData);
    Cookies.set(token_name, new_token.data.token, { expires: 1 });
    Cookies.set(refresh_token_name, new_token.refresh_token, { expires: 1 });
  }catch (error){
    console.log(error);
    Cookies.remove(token_name);
    Cookies.remove(refresh_token_name);
    router.replace({ pathname: '/login' });
  }
}
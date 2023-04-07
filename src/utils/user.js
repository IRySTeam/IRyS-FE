import axios from 'axios';
import { getUserDetailSuccess, getUserDetailFailed } from '@/state/actions/userActions';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import Cookies from 'js-cookie';

export const getUserDetail = async (token, dispatch, router) => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getUserDetailSuccess(response.data))
  } catch (error) {
    if(error.response.status === 401){
      const token = Cookies.get('access_token');
      const refresh_token = Cookies.get('refresh_token');
      const refreshData = {
        token: token,
        refresh_token: refresh_token
      }
      try {
        const new_token = await axios.post(`${NEXT_PUBLIC_API_URL}/auth/refresh`, refreshData);
        console.log(new_token);
        Cookies.set('access_token', new_token.data.token, { expires: 1 });
        Cookies.set('refresh_token', new_token.data.refresh_token, { expires: 1 });
        getUserDetail(new_token.data.token, dispatch)
      }catch (error){
        dispatch(getUserDetailFailed(error.response.data))
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        router.replace({ pathname: "/login" });
      }
    }
    dispatch(getUserDetailFailed(error.response.data))
  }
}
import axios from 'axios';
import { getUserDetailSuccess, getUserDetailFailed } from '@/state/actions/userActions';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';
import Cookies from 'js-cookie';
import { refresh } from './token';

export const getUserDetail = async (token, dispatch, router) => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getUserDetailSuccess(response.data))
  } catch (error) {
    if(error.response && error.response.status === 401){
      try {
        refresh('access_token', 'refresh_token', router);
        const token = Cookies.get('access_token');
        getUserDetail(token, dispatch, router)
      }catch (error){
        if(error.response && error.response.status !== 500){
          dispatch(getUserDetailFailed(error.response.data))
        }
      } 
    }
    dispatch(getUserDetailFailed('Network Error')) 
  }
}
import axios from 'axios';
import { getUserDetailSuccess, getUserDetailFailed } from '@/state/actions/userActions';
import { NEXT_PUBLIC_API_URL } from '@/constants/api';

export const getUserDetail = async (token, dispatch) => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(getUserDetailSuccess(response.data))
  } catch (error) {
    console.log(error)
    dispatch(getUserDetailFailed(error.response.data))
  }
}
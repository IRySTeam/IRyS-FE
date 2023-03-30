import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUserDetailSuccess, getUserDetailFailed } from '@/state/actions/userActions';
import jwt_decode from "jwt-decode";
import { NEXT_PUBLIC_API_URL } from '@/constants/api';

export const getUserDetail = async (token, dispatch) => {
  const id = jwt_decode(token).user_id;

  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/users/${id}`, {
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
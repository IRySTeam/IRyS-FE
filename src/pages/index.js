import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { Typography, Button } from "@mui/material";
import Cookies from 'js-cookie'
import { getUserDetail } from "@/utils/user";

export default function Home() {

  const userDetail = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!userDetail.id){
      const token = Cookies.get('access_token');
      if(token){
        getUserDetail(token, dispatch);
      }
    }
  }, [userDetail, dispatch, router]);

  
  const logout =  () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.replace({ pathname: "/login" })
  }

  return (
    <>
      <main>
        <div>
          <Typography variant={"heading_h1"} sx={{ color: "black.main" }}>
            {userDetail? `Hi, ${userDetail.first_name} ${userDetail.last_name}` : "IRyS"}
          </Typography>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      </main>
    </>
  )
}

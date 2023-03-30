import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { Container, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie'
import { getUserDetail } from "@/utils/user";
import Loading from "@/component/loading";

export default function Home() {

  const userDetail = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Protected Route
    const token = Cookies.get('access_token');
    setIsLoading(true)
    if(token){
      if(!userDetail.id){
        getUserDetail(token, dispatch);
      }
      setIsLoading(false)
    }else{
      router.push({ pathname: "/login" })
    }
  }, [userDetail, dispatch, router]);

  
  const logout =  () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.replace({ pathname: "/login" })
  }

  return (
    <>
      { isLoading && <Loading /> }
      {!isLoading && 
        <Container 
          sx={{
            padding: "0", 
            minHeight:"100vh",
            display: "flex",
            flexDirection: "column", 
            gap: "32px",
            alignItems: "center",
            justifyContent: "center"
          }} 
        >
          <Typography variant={"heading_h1"} sx={{ color: "black.main" }}>
            {userDetail? `Hi, ${userDetail.first_name} ${userDetail.last_name}` : "IRyS"}
          </Typography>
          <Button 
            color="primary" 
            variant="contained" 
            sx={{ 
              height: "56px",
              marginTop: "8px",
            }}
            type="submit"
            onClick={logout}
          >
            Logout
          </Button> 
        </Container>
      }
    </>
  )
}

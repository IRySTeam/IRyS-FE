import { useState } from "react";
import { Container, Button } from "@mui/material";
import Loading from "@/component/loading";
import NavBar from "@/component/navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      { isLoading && <Loading/> }
      {!isLoading &&
        <>
          <NavBar 
            setIsLoading={setIsLoading}
          />
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
            <Button 
              color="primary" 
              variant="contained" 
              sx={{ 
                height: "56px",
                marginTop: "8px",
              }}
              type="submit"
            >
              Homepage
            </Button> 
          </Container>
        </> 
      }
    </>
  )
}

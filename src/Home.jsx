import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Card from './Card'
import axios from "axios"; 

const Home = () => {

  const checkoutHandler = async (amount)=>{

    const{data:{key}} = await axios.get("http://localhost:4000/api/getkey")

    const {data:{order}} = await axios.post("http://localhost:4000/api/checkout",{amount})


    const options = {
      key:key,
      amount: order.amount,
      currency: "INR",
      name: "Hansraj Parmar",
      description: "Test Transaction",
      image: "https://avatars.githubusercontent.com/u/110182495?v=4",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#121212"
      }
  };
  const razor = new window.Razorpay(options);
      razor.open();
  
  }

  return (
    <Box>
        <Stack h={"100vh"} justifyContent={"center"} alignItems={"center"} direction={["column","row"]} >

            <Card amount={5000} img={"https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"} checkoutHandler={checkoutHandler} />
            <Card amount={5000} img={"https://www.shutterstock.com/image-photo/bangkok-thailand-hp-launch-new-260nw-2126914553.jpg"} checkoutHandler={checkoutHandler} />

        </Stack>

    </Box>
  )
}

export default Home
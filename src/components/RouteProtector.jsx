// import React, { Component } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RouteProtector(props) {
    const {Component} = props;
    const navigate = useNavigate();
    useEffect(()=> {
        let login = localStorage.getItem("login");
        console.log(typeof(login));
        if(!login){
            navigate("/")
        }
    });
  return (
    <><Component/> </>
  )
}

export default RouteProtector;
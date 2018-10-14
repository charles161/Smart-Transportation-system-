pragma solidity ^0.4.18;

contract User {
  uint private balance = 1000;
  uint private carbon = 0;

  function User(uint amount,uint cb){
    balance = amount;
    carbon = cb;
  }

  function addBalance(uint amount){
    balance+=amount;
  }

  function subBalance(uint amount){
    balance-=amount;
  }

  function addCarbon(uint amount){
    carbon+=amount;
  }

  function subCarbon(uint amount){
    carbon-=amount;
  }

}
import styled from 'styled-components';

export const Nav = styled.div`
  width: 94%;
  height: 50px;
  background-color: rgba(109, 7, 26, 0.95);
  z-index: 1;
  position: absolute;
  border-radius: 25px;
  display: flex;
  top: 6px;
  right: 3%;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 1050px) {
    width: 94%;
    right: 3%;
  }

  .heart {
    margin-right: 2%;
    padding-top: 2px;
    img {
      width: 25px;
      height: 23px;
    }
  }
  .avatar {
    img {
      border-radius: 50%;
      width: 27px;
      height: 27px;
    }
  }
  .question {
    img {
      border-radius: 50%;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Icons = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: space-between;
  width: 125px;
  align-items: center;
  cursor: pointer;
  .signout {
    img {
      border-radius: 50%;
      width: 27px;
      height: 27px;
    }
  }
`;

export const InButton = styled.button`
  width: 75px;
  height: 35px;
  background-color: rgb(224, 160, 1);
  color: rgb(35, 34, 48);
  font-weight: bold;
  border-radius: 20px;
  border: 3px solid rgb(167, 121, 6);
  margin-right: 10px;
  box-shadow: 0 4px 2px -2px rgba(15, 15, 15, 0.2);
  cursor: pointer;

  &:hover {
    background-color: rgb(245, 178, 12);
    box-shadow: 0px 5px 6px 0px rgba(15, 15, 15, 0.5);
    border: none;
  }

  &:active {
    background-color: rgb(224, 160, 1);
    border: 3px solid rgb(167, 121, 6);
    box-shadow: 0 4px 2px -2px rgba(15, 15, 15, 0.2);
  }

  &:focus {
    outline: 0;
  }
`;

export const DropMenu = styled.div`
  position: absolute;
  min-width: 160px;
  background-color: rgba(109, 7, 26, 0.95);
  z-index: 1;
  padding: 12px 16px;
  margin-top: 20px;
  right: 1%;
  height: 75px;
  border: none;
  border-radius: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`;

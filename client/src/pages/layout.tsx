import { FC } from 'react';
import { Outlet } from "react-router-dom";
import { NavBar } from '../components/nav-bar';

export const Layout: FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
import { FC } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import './nav-bar.scss';
import { chartsMappings } from '../config/mappings'

interface LinkProps {
    path: string;
    label: string;
}

export const NavBar:FC = () => {
  const links: LinkProps[] = [
      { path: '/', label: 'Home' },
      { path: '/lookup', label: 'Lookup' },
      { path: '/charts', label: 'Charts' },
      { path: '/config', label: 'Config' },
  ];

  let params = useParams();

  return (
    <nav>
      <ul>
        { links.map(({ path, label }) => {
            const navLink = (
              <NavLink className={({ isActive }) => isActive ? "selected" : ""} to={ path }>{ label }</NavLink>
            );
            let selectedChart;

            if (path.startsWith('/charts') && params['chart_id']) {
              if (params['chart_id']) {
                selectedChart = <li className="sub-selected">{ chartsMappings[params['chart_id']] }</li>;
              }
            }

            return (
              <>
                <li>{ navLink }</li>
                { selectedChart }
              </>
           );
          })
        }
        </ul>
    </nav>
  )
}
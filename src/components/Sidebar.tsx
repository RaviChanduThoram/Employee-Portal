import React, { useEffect, useMemo } from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import Dashboard from '@mui/icons-material/Dashboard';
import Person from '@mui/icons-material/Person';

import CheckCircle from '@mui/icons-material/HowToReg'; // Alternative for Attendance
import Assessment from '@mui/icons-material/Visibility'; 
import Event from '@mui/icons-material/Event';
import Money from '@mui/icons-material/Money';
import Schedule from '@mui/icons-material/Schedule';

import Feedback from '@mui/icons-material/Feedback';
import { fetchMenuItemsRequest } from "../redux/actions/SidebarSlice";
import exp from "constants";

type IconNames = 
  | "Dashboard"
  | "Person"
  | "Event"
  | "Money"
  |"CheckCircle"
  | "Schedule"
  | "Assessment"
  | "Feedback"

const iconMap: Record<IconNames, React.ElementType> = {
  Dashboard,
  Person,
  Event,
  Money,
  CheckCircle,
  Schedule,
  Assessment,
  Feedback,
};


const drawerWidth = 240;

type SidebarProps = {
  openDrawer: boolean;
  onItemSelect: (item: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ openDrawer, onItemSelect }) => {
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.sidebar
  );
  useEffect(() => {
    dispatch(fetchMenuItemsRequest());
  }, [dispatch]);
  console.log(items);
  //Avoids unneccessary computations.
  //optimize performance by memoizing the result of a computation.
  //It helps prevent unnecessary recalculations of expensive operations during component re-renders.

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <Divider />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <List>
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon as IconNames] 
           return (<ListItem  key={index} disablePadding>
              <ListItemButton style={{padding:"initial",paddingTop:"8px",paddingBottom:"8px"}} onClick={() => onItemSelect(item.name)}>
                <ListItemIcon ></ListItemIcon>
                {IconComponent ? <IconComponent /> : null}
                <ListItemText style={{padding:"4px"}}primary={item.name} />
              </ListItemButton>
            </ListItem>)
})}
        </List>
        
      </Drawer>
    </div>
  );
};


export default Sidebar

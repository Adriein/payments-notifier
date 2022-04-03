import React from "react";

export interface UserTableProps {
  openProfileModal: () => void;
  selectUser: React.Dispatch<React.SetStateAction<string>>;
  isModalOpen: () => boolean;
}
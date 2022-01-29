import { AvatarProps } from "./AvatarProps";
import { StyledLetter } from "./Styles";

const AVATAR_BACKGROUND_COLORS = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA',
];

const getColorFromName = (name: string) => {
  return AVATAR_BACKGROUND_COLORS[name.toLocaleLowerCase().charCodeAt(0) % AVATAR_BACKGROUND_COLORS.length];
};

const getInitials = (username: string) => {
  const [ name, surname ] = username.split(' ');

  if (surname) {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  }

  return `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`;
}

const Avatar = ({ name, size }: AvatarProps) => {
  return (
    <StyledLetter size={size} color={getColorFromName(name)}>
      <span>{getInitials(name)}</span>
    </StyledLetter>
  );
}

export default Avatar;
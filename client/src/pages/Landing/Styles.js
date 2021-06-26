import styled from 'styled-components';
import { COLORS } from '../../shared/utils/colors';
import { FaLinkedin } from 'react-icons/fa';
import { QUERIES } from '../../shared/utils/constants';

export const LandingPage = styled.div`
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: black;
`;

export const ContentWrapper = styled.div`
  display: flex;
  margin-left: 230px;
  margin-right: 230px;
  width: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    margin: 0;
    align-items: center;
    padding: 0px 10px;
  }
`;

export const Logo = styled.img`
  width: 250px;
  height: 100px;
  object-fit: contain;
  object-position: center-right;

  @media ${QUERIES.phoneAndSmaller} {
    width: 200px;
    height: 100px;
  }
`;

export const Space = styled.div`
  flex-grow: 1;
`;

export const Signin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const HeroWrapper = styled.div`
  background-color: ${COLORS.backgroundWhite};
  padding: 80px 0px;
`;

export const Hero = styled.div`
  display: flex;
  margin-left: 230px;
  margin-right: 230px;
`;

export const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 100px;
`;

export const HeroVideo = styled.div``;

export const HeroTitle = styled.p`
  font-size: 40px;
`;

export const HeroTitleEmphasis = styled.p`
  color: ${COLORS.primary};
  font-weight: 500;
`;

export const HeroSubtitle = styled.p`
  color: ${COLORS.textLight};
  margin-top: 30px;
  margin-bottom: 10px;
  flex-grow: 1;
`;

export const HeroActionButtons = styled.div`
  padding: 5px 0px 5px 0px;
  display: flex;
  width: 280px;
  justify-content: space-between;
`;

export const WhyWrapper = styled.div`
  padding: 50px 50px 50px 50px;
  display: flex;
  justify-content: center;
  color: ${COLORS.textMedium};
`;

export const WhyTitle = styled.h2`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 500;
`;

export const WhyTitleSpan = styled.span`
  color: ${COLORS.primary};
  margin-right: 6px;
`;

export const WhyCard = styled.div`
  padding: 60px 20px 40px 20px;
  width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const WhyHero = styled(Hero)`
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const WhyCardTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: 500;
`;

export const WhyCardSubtitle = styled.h5`
  margin-bottom: 10px;
  color: ${(props) => (props.success ? COLORS.success : COLORS.textMedium)};
`;

export const WhyCardContent = styled.article``;

export const WhyCardMedia = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
`;

export const WhyActionButtons = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const WhoWrapper = styled.div`
  background-color: ${COLORS.backgroundWhite};
  padding: 50px 50px 50px 50px;
  display: flex;
  justify-content: center;
`;

export const WhoBodyText = styled.div`
  padding: 20px;
  max-width: 800px;
`;

export const WhoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 300px;
  padding: 20px;
`;

export const WhoProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  object-position: center right;
`;

export const LogoLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const LinkedinIcon = styled(FaLinkedin)`
  font-size: 30px;
`;

export const WhoTextWrapper = styled.div`
  display: flex;
`;

export const WhoActionButtons = styled.div`
  margin-top: 40px;
  width: 100%;
`;

export const WhoTitle = styled.h2`
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  font-weight: 500;
`;

export const WhoTitleSpan = styled.span`
  color: ${COLORS.primary};
  margin-right: 6px;
`;

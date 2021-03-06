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

export const HeaderMargin = styled.div`
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

export const HeroMargin = styled.div`
  display: flex;
  margin-left: 230px;
  margin-right: 230px;

  @media ${QUERIES.laptopAndSmaller} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`;

export const HeroWrapper = styled.div`
  background-color: ${COLORS.backgroundWhite};
  padding: 80px 0px;

  @media ${QUERIES.phoneAndSmaller} {
    padding: 30px 0px;
  }
`;

export const HeroDescription = styled.div`
  display: flex;
  margin-right: 100px;
  min-height: 338px;
  flex-direction: column;

  @media ${QUERIES.laptopAndSmaller} {
    margin: 0;
    padding: 0 10px;
    justify-content: center;
    align-items: center;
  }
`;

export const HeroVideo = styled.div`
  @media ${QUERIES.laptopAndSmaller} {
    display: none;
  }
  @media ${QUERIES.phoneAndSmaller} {
    margin-top: 20px;
  }
`;

export const HeroTitle = styled.p`
  font-size: 40px;

  @media ${QUERIES.bigLaptopAndSmaller} {
    font-size: 30px;
  }

  @media ${QUERIES.laptopAndSmaller} {
    text-align: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: 25px;
  }
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

  @media ${QUERIES.laptopAndSmaller} {
    text-align: center;
    max-width: 650px;
    flex-grow: 0;
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: 15px;
  }
`;

export const HeroActionButtons = styled.div`
  padding: 5px 0px 5px 0px;
  display: flex;
  width: 280px;
  justify-content: space-between;
`;

export const WhyWrapper = styled.div`
  padding: 50px 0px;
  display: flex;
  justify-content: center;
  margin-left: 230px;
  margin-right: 230px;
  color: ${COLORS.textMedium};

  @media ${QUERIES.laptopAndSmaller} {
    margin: 0;
  }
`;

export const WhyTitle = styled.h2`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 500;

  @media ${QUERIES.phoneAndSmaller} {
    flex-wrap: wrap;
  }
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

export const WhyHero = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
  }
`;

export const WhoActionButtons = styled.div`
  margin-top: 40px;
  width: 100%;
`;

export const WhoTitle = styled.h2`
  padding-bottom: 10px;
  width: 100%;
  font-weight: 500;
  &:after {
    content: 'log';
    color: ${COLORS.primary};
  }
`;

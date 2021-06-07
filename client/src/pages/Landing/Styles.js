import styled from 'styled-components';
import { COLORS } from '../../shared/utils/colors';

export const LandingPage = styled.div`
  overflow-x: hidden;
`;

export const HeroWrapper = styled.div`
  background-color: ${COLORS.backgroundWhite};
  padding: 50px;
`;

export const Hero = styled.div`
  display: flex;
  margin-left: 230px;
  margin-right: 230px;
`;

export const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  margin-right: 100px;
`;

export const HeroVideo = styled.div``;

export const HeroTitle = styled.p`
  font-size: 30px;
`;

export const HeroTitleEmphasis = styled.p`
  color: ${COLORS.primary};
  font-weight: 500;
`;

export const HeroSubtitle = styled.p`
  color: ${COLORS.textLight};
`;

export const HeroActionButtons = styled.div`
  padding: 5px 0px 5px 0px;
  display: flex;
  width: 280px;
  justify-content: space-between;
`;

export const WhyWrapper = styled.div`
  padding: 20px 50px 20px 50px;
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
  padding: 20px 50px 20px 50px;
  display: flex;
  justify-content: center;
`;

export const WhoBodyText = styled.div`
  
`;

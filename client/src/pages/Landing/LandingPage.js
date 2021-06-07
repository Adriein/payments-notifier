import React from 'react';
import * as Styled from './Styles';
import Button from '../../shared/components/Button/Button';

import onlinePaymentsImg from '../../img/undraw_online_payments_luau.svg';
import dietImg from '../../img/undraw_healthy_options_sdo3.svg';
import exercicesImg from '../../img/undraw_fitness_stats_sht6.svg';

const LandingPage = () => {
  return (
    <Styled.LandingPage>
      <Styled.HeroWrapper>
        <Styled.Hero>
          <Styled.HeroDescription>
            <Styled.HeroTitle>
              La solución integral para profesionales del
              <Styled.HeroTitleEmphasis>
                deporte y la nutrición
              </Styled.HeroTitleEmphasis>
            </Styled.HeroTitle>
            <Styled.HeroSubtitle>
              Gestiona todo lo relacionado con tu negocio de una forma cómoda y
              eficiente. Nutrilog es la manera más rápida de poder llevar más
              clientes sin perder calidad en tus asesorías.
            </Styled.HeroSubtitle>
            <Styled.HeroActionButtons>
              <Button type="submit" variant="primary">
                Regístrate
              </Button>
              <Button type="submit" variant="secondary">
                Contacta con nostros
              </Button>
            </Styled.HeroActionButtons>
          </Styled.HeroDescription>
          <Styled.HeroVideo>
            <iframe
              width="400"
              height="200"
              src={`https://www.youtube.com/embed/EZzbh9YjVhQ?list=RDEZzbh9YjVhQ`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Styled.HeroVideo>
        </Styled.Hero>
      </Styled.HeroWrapper>
      <Styled.WhyWrapper>
        <Styled.WhyHero>
          <Styled.WhyTitle>
            ¿Qué hace Nutri<Styled.WhyTitleSpan>log</Styled.WhyTitleSpan>
            especial?
          </Styled.WhyTitle>
          <Styled.WhyCard>
            <Styled.WhyCardMedia src={onlinePaymentsImg} />
            <Styled.WhyCardTitle>PAGOS</Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle success>ACTIVO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Nutrilog te ayuda a gestionar los pagos de tus clientes, controla
              quién y cuándo ha pagado. Cuando la suscripción de esa persona
              haya caducado recibirá un email de preaviso, tanto el contenido
              del email como el momento en el que se manda es 100% configurable
            </Styled.WhyCardContent>
          </Styled.WhyCard>
          <Styled.WhyCard>
            <Styled.WhyCardMedia src={dietImg} />
            <Styled.WhyCardTitle>DIETAS </Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle>EN DESARROLLO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Con Nutrilog puedes elaborar y gestionar las dietas de tus
              clientes. Usa las guías interactivas y las herramientas que te
              proporciona la aplicación para elaborar dietas lo más
              eficientemente posible y mejor adaptadas a tus clientes
            </Styled.WhyCardContent>
          </Styled.WhyCard>
          <Styled.WhyCard>
            <Styled.WhyCardMedia src={exercicesImg} />
            <Styled.WhyCardTitle>EJERCICIOS</Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle>EN DESARROLLO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Pautar ejercicios y guiar a tus clientes para realizarlos
              correctamente nunca fue tan fácil, con Nutrilog recibes las
              herramientas adecuadas para hacer progresar a tus clientes
            </Styled.WhyCardContent>
          </Styled.WhyCard>
          <Styled.WhyActionButtons>
            <Button type="submit" variant="primary">
              ¡Quiero probarlo!
            </Button>
          </Styled.WhyActionButtons>
        </Styled.WhyHero>
      </Styled.WhyWrapper>
      <Styled.WhoWrapper>
        <Styled.WhyTitle>
          ¿Quien somos?
        </Styled.WhyTitle>
        <Styled.WhoBodyText>
          Los valores primordiales que sigue el desarrollo de Nutri<Styled.WhyTitleSpan>log</Styled.WhyTitleSpan> son la honestidad y la transparencia. El objetivo es llegar a ser la app de referencia en el sector. Actualmente la aplicación esta en una fase Beta lo que significa que cada mes a la app  se le incorporan mejoras. Nutri<Styled.WhyTitleSpan>log</Styled.WhyTitleSpan> está siendo desarrollada por un solo programador 
        </Styled.WhoBodyText>
      </Styled.WhoWrapper>
    </Styled.LandingPage>
  );
};

export default LandingPage;

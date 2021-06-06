import React from 'react';
import * as Styled from './Styles';
import Button from '../../shared/components/Button/Button';

import onlinePaymentsImg from '../../img/undraw_online_payments_luau.svg'
import dietImg from '../../img/undraw_healthy_options_sdo3.svg'
import exercicesImg from '../../img/undraw_fitness_stats_sht6.svg'

const LandingPage = () => {
  return (
    <Styled.LandingPage>
      <Styled.HeroWrapper>
        <Styled.Hero>
          <Styled.HeroDescription>
            <Styled.HeroTitle>
              La solución integral para profesionales del
              <Styled.HeroTitleEmphasis>
                deporte y la alimentación
              </Styled.HeroTitleEmphasis>
            </Styled.HeroTitle>
            <Styled.HeroSubtitle>
              Gestiona todo lo relacionado con tu negocio de una forma comoda y
              eficiente. Nutrilog es la manera mas rápida de poder llevar mas
              clientes sin perder calidad en tus asesorias.
            </Styled.HeroSubtitle>
            <Styled.HeroActionButtons>
              <Button type="submit" variant="primary">
                Registrate
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
            ¿Qué hace Nutri<Styled.WhyTitleSpan>log</Styled.WhyTitleSpan>{' '}
            especial?
          </Styled.WhyTitle>
          <Styled.WhyCard>
            <Styled.WhyCardMedia src={onlinePaymentsImg}/>
            <Styled.WhyCardTitle>PAGOS</Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle success>ACTIVO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Nutrilog te ayuda a gestionar los pagos de tus clientes, controla
              quien ha pagado y cuando. Cuando la suscripción de esa persona
              haya caducado recibira un mail de pre aviso, tanto el contenido
              del mail como el momento en el que se manda es 100% configurable
            </Styled.WhyCardContent>
          </Styled.WhyCard>
          <Styled.WhyCard>
          <Styled.WhyCardMedia src={dietImg}/>
            <Styled.WhyCardTitle>DIETAS </Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle>EN DESARROLLO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Con Nutrilog puedes elaborar y gestionar las dietas de tus
              clientes. Usa las guias interactivas y las herramientas que te
              proporciona la aplicacion para elaborar dietas lo mas
              eficientemente posible y mas adaptadas a tus clientes
            </Styled.WhyCardContent>
          </Styled.WhyCard>
          <Styled.WhyCard>
          <Styled.WhyCardMedia src={exercicesImg}/>
            <Styled.WhyCardTitle>EJERCICIOS</Styled.WhyCardTitle>
            <Styled.WhyCardSubtitle>EN DESARROLLO</Styled.WhyCardSubtitle>
            <Styled.WhyCardContent>
              Pautar ejercicios y guiar a tus clientes para realizarlos
              correctamente nunca fue tan fácil, con Nutrilog recibes las
              herramientas adecuadas para hacer progresar a tus clientes
            </Styled.WhyCardContent>
          </Styled.WhyCard>
        </Styled.WhyHero>
      </Styled.WhyWrapper>
    </Styled.LandingPage>
  );
};

export default LandingPage;

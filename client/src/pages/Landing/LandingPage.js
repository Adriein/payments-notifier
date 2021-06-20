import React, { useContext } from 'react';
import * as Styled from './Styles';
import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/Modal/Modal';
import Login from '../../project/Login/Login';

import onlinePaymentsImg from '../../img/undraw_online_payments_luau.svg';
import dietImg from '../../img/undraw_healthy_options_sdo3.svg';
import exercicesImg from '../../img/undraw_fitness_stats_sht6.svg';
import developer from '../../img/curridefi.jpg';
import logo from '../../img/nutrilog-C3.png';

import { Context as AuthContext } from '../../context/AuthContext';
import { Redirect } from 'react-router-dom';

import useQueryParamModal from '../../hooks/useQueryParamModal';
import Contact from '../../project/Contact/Contact';
import Register from '../../project/Register/Register';

const LandingPage = () => {
  const { signin, getToken, contact } = useContext(AuthContext);

  const LOGIN = 'login';
  const REGISTER = 'register';
  const CONTACT = 'contact';

  const loginModalHelpers = useQueryParamModal(LOGIN);
  const registerModalHelpers = useQueryParamModal(REGISTER);
  const contactModalHelpers = useQueryParamModal(CONTACT);

  if (getToken) {
    return <Redirect to="/home" />;
  }

  return (
    <Styled.LandingPage>
      {loginModalHelpers.isOpen() && (
        <Modal
          isOpen
          width={500}
          withCloseIcon={false}
          onClose={loginModalHelpers.close}
          renderContent={(modal) => (
            <Login
              modalClose={modal.close}
              onCreate={loginModalHelpers.close}
              signin={signin}
            />
          )}
        />
      )}
      {registerModalHelpers.isOpen() && (
        <Modal
          isOpen
          width={500}
          withCloseIcon={false}
          onClose={registerModalHelpers.close}
          renderContent={(modal) => (
            <Register
              modalClose={modal.close}
              onCreate={registerModalHelpers.close}
            />
          )}
        />
      )}
      {contactModalHelpers.isOpen() && (
        <Modal
          isOpen
          width={800}
          withCloseIcon={false}
          onClose={contactModalHelpers.close}
          renderContent={(modal) => (
            <Contact
              modalClose={modal.close}
              onCreate={contactModalHelpers.close}
              send={contact}
            />
          )}
        />
      )}
      <Styled.Header>
        <Styled.Logo src={logo} />
        <Styled.Space />
        <Styled.Signin>
          <Button
            type="submit"
            variant="secondary"
            onClick={loginModalHelpers.open}
          >
            Entrar
          </Button>
        </Styled.Signin>
      </Styled.Header>
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
              <Button type="submit" variant="primary" onClick={registerModalHelpers.open}>
                Regístrate
              </Button>
              <Button type="submit" variant="secondary" onClick={contactModalHelpers.open}>
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
            <Button type="submit" variant="primary" onClick={registerModalHelpers.open}>
              ¡Quiero probarlo!
            </Button>
          </Styled.WhyActionButtons>
        </Styled.WhyHero>
      </Styled.WhyWrapper>
      <Styled.WhoWrapper>
        <Styled.WhyHero>
          <Styled.WhoTextWrapper>
            <Styled.WhoCard>
              <Styled.WhoProfile src={developer} />
              <Styled.WhyCardTitle>Adrià Claret</Styled.WhyCardTitle>
              <Styled.WhyCardSubtitle>
                Ingeniero programador full stack
              </Styled.WhyCardSubtitle>
              <Styled.LogoLink
                href="https://www.linkedin.com/in/adria-claret-sanchez-b43167104/"
                target="_blank"
              >
                <Styled.LinkedinIcon />
              </Styled.LogoLink>
            </Styled.WhoCard>
            <Styled.WhoBodyText>
              <Styled.WhoTitle>
                El equipo y la misión de Nutri
                <Styled.WhoTitleSpan>log</Styled.WhoTitleSpan>
              </Styled.WhoTitle>
              Los valores primordiales que sigue el desarrollo de Nutri
              <Styled.WhyTitleSpan>log</Styled.WhyTitleSpan>son la honestidad y
              la transparencia. La misión es llegar a ser la app de referencia
              en el sector. Actualmente la aplicación está en una fase Beta lo
              que significa que con frecuencia se lanzan actualizaciones pese
              que la app es 100% funcional en los módulos ya lanzados.
              <Styled.WhoActionButtons>
                <Button type="submit" variant="primary" onClick={contactModalHelpers.open}>
                  Contacta
                </Button>
              </Styled.WhoActionButtons>
            </Styled.WhoBodyText>
          </Styled.WhoTextWrapper>
        </Styled.WhyHero>
      </Styled.WhoWrapper>
    </Styled.LandingPage>
  );
};

export default LandingPage;

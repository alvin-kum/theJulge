import React from "react";
import {
  FooterWrapper,
  FooterPrivacy,
  FooterSNS,
  FooterCodeit,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterCodeit>© 2025 Codeit</FooterCodeit>

      <FooterPrivacy>
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </FooterPrivacy>

      <FooterSNS>
        <a href="mailto:example@mail.com">
          <img src="/images//Footer/mail.svg" alt="mail" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/Footer/facebook.svg" alt="facebook" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images//Footer/instagram.svg" alt="instagram" />
        </a>
      </FooterSNS>
    </FooterWrapper>
  );
};

export default Footer;

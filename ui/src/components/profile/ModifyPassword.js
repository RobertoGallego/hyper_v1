import React from "react";
import Header from "../general/Header";
import { Container, Footer } from "./StyleForProfile";
import { useTranslation } from "react-i18next";
import ModifyPasswordCard from "./ModifyPasswordCard";

export default function ModifyPassword() {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <Container>
        <ModifyPasswordCard />
        <Footer>
          <p>{t("footer")}</p>
        </Footer>
      </Container>
    </div>
  );
}

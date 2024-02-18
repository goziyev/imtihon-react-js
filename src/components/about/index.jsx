import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem("lang")) {
      let lang = localStorage.getItem("lang");
      i18n.changeLanguage(lang);
    }
  }, []);
  return (
    <div className="align-element py-20">
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h3 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          {t("aboutTitle")}
        </h3>
        <div class="stats bg-primary shadow">
          <div class="stat">
            <div class="stat-title text-primary-content text-4xl font-bold tracking-widest">
              {t("aboutTitleSpan")}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
        quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio
        aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed
        officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!
      </p>
    </div>
  );
}

export default About;

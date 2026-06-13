import navbar from "./navbar";
import home from "./home";
import common from "./common";
import footer from "./footer";
import contact from "./contact";
import services from "./services";
import about from "./about";
import assessment from "./assessment";
import solutions from "./solutions";
import industries from "./industries";
import partners from "./partners";
import insights from "./insights";
import caseStudies from "./caseStudies";
import careers from "./careers";
import privacy from "./privacy";

const messages = {
  navbar,
  home,
  common,
  footer,
  contact,
  services,
  about,
  assessment,
  solutions,
  industries,
  partners,
  insights,
  caseStudies,
  careers,
  privacy,
} as const;

export default messages;
export type Messages = typeof messages;

import type { AppDataInterface } from '../../types';

export const defaultAppState: AppDataInterface = {
  LoginFormData: {
    title: "",
    label1: "",
    label2: "",
    buttonText1: "",
    paragraph1: "",
    paragraph2: "",
    buttonText2: "",
    emailPlaceholder: "",
    passwordPlaceholder: ""
  },
  BannerData: { title: "", paragraph: "" },
  BuyPassData: {
    title: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    text: "",
    areaSelectionButton: ""
  },
  BikeStationData: {
    title: "",
    searchPlaceholder: ""
  },
  TicketsInformationData: { title: "", paragraph1: "", paragraph2: "" },
  TicketsPrice: [{
    title: "",
    text: "",
    price: "",
    paragraph: "",
    button: ""  // Add the button property
  }],
  TicketsPriceHeader: [{ title: "" }],
  Contact: []
};

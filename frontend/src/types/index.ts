export interface ProfileType {
  picture?: string;
  name: string;
  email?: string;
}

export interface BikeStationInterface {
  title: string;
  searchPlaceholder: string;
}

export interface LoginFormInterface {
  title: string;
  label1: string;
  label2: string;
  buttonText1: string;
  paragraph1: string;
  paragraph2: string;
  buttonText2: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
}

export interface BuyPassInterface {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  text: string;
  areaSelectionButton: string;
}

export interface TicketsPriceItem {
  title: string;
  text: string;
  price: string;
  paragraph: string;
  button: string; // Add this missing property
}

export interface TicketsPriceInterface {
  title: string;
  text: string;
  price: string;
  paragraph: string;
}

export interface BannerInterface {
  title: string;
  paragraph: string;
}

export interface TicketsInterface {
  title: string;
  paragraph1: string;
  paragraph2: string;
}

export interface ContactInterface {
  header1: string;
  header2: string;
  header3: string;
  header4: string;
  header5: string;
  header6: string;
  header7: string;
  header8: string;
  header9: string;
  header10: string;
}

export interface AppDataInterface {
  LoginFormData: LoginFormInterface;
  BannerData: BannerInterface;
  BuyPassData: BuyPassInterface;
  BikeStationData: BikeStationInterface;
  TicketsInformationData: TicketsInterface;
  TicketsPrice: TicketsPriceItem[];
  TicketsPriceHeader: Array<{ title: string }>;
  Contact: ContactInterface[];
}

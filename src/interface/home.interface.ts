interface HeaderAllDTOoutItem {
  map(
    arg0: (data: any, index: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
  rcc: string;
  headerNumber: number;
  file_name: string;
  header_name: string;
  popup: string;
  sequence: number;
}

interface DataPage {
  rcc: string;
  namePage: string;
  title: string;
  subTitleH1: string;
  subTitleH2: string;
  subTitleH3: string;
  header1DTOoutList: HeaderAllDTOoutItem[];
  header2DTOoutList: HeaderAllDTOoutItem[];
  header3DTOoutList: HeaderAllDTOoutItem[];
}

interface Level {
  rcc: string;
  userid: string;
  level: string;
}

interface TimeLogin {
  user: string;
  ip: string;
  loginTime: string;
  logoutTime: string;
  useTime: string;
}

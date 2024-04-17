interface UserData {
  find(arg0: (f: any) => boolean): unknown;
  map(
    arg0: (user: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
  rcc: string;
  userid: string;
  fullname: string;
  level: string;
  secret: string;
}

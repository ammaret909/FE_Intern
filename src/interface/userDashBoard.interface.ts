interface UserDashBoard {
    map(arg0: (user: any) => import("react/jsx-runtime").JSX.Element): React.ReactNode;
    userid: string;
    loginRCC: string;
    countLogin: number;
    logoutRCC: string;
    countLogout: number;
  }
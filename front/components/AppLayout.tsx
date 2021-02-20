import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div>공통메뉴</div>
      {children}
    </div>
  )
};

export default AppLayout;
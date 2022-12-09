import type { CSSProperties } from "react";
// types

import { Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
// React module

/** '`Material UI`에서 사용하는 style 지정하는 Hooks' */
const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
    flexDirection: "column",
  },
}));

/** 'Loading 상태를 보여주는 컴포넌트에서 사용할 props' */
interface LoadingProps {
  /** Loading 상태 */
  loading: boolean;
  /** 요소 개별 스타일 */
  style?: CSSProperties;
  value?: number;
}

const Loading = ({ loading, value, style }: LoadingProps) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} style={style} open={loading}>
      <CircularProgress color="inherit" />
      <p>{value}</p>
    </Backdrop>
  );
};

export default Loading;

import { Box, type BoxProps, CircularProgress, Typography } from "@mui/material";
import  type { UseQueryResult } from "@tanstack/react-query";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props<T> extends Omit<BoxProps, "children"> {
  query: UseQueryResult<T>;
  children: (data: T) => ReactNode;
  errMsg?: string;
  onRetry?: () => void;
}

interface State {
  caught: Error | null;
}

export class StatusContainer<T> extends Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = { caught: null };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ caught: error });
  }

  render() {
    const {
      query,
      children: renderChildren,
      errMsg,
      onRetry,
      ...props
    } = this.props;
    if (this.state.caught) {
      return (
        <Box
          overflow={"hidden auto"}
          alignContent={"center"}
          textAlign={"center"}
          {...props}>
          <Typography
            color="error"
            variant="caption"
            fontSize={"small"}
            whiteSpace={"pre-wrap"}>
            渲染异常.{this.state.caught.message}
          </Typography>
        </Box>
      );
    }

    if (query.status === "success") {
      let children;
      try {
        children = renderChildren(query.data);
      } catch (e: any) {
        return (
          <Box
            overflow={"hidden auto"}
            alignContent={"center"}
            textAlign={"center"}
            {...props}>
            <Typography
              color="gray"
              variant="caption"
              fontSize={"small"}
              whiteSpace={"pre-wrap"}>
              渲染异常.{"\n"}
              {e?.toString()}
            </Typography>
          </Box>
        );
      }
      return (
        <Box
          overflow={"hidden auto"}
          alignContent={"center"}
          {...props}>
          {children}
        </Box>
      );
    }

    return (
      <Box
        overflow={"hidden auto"}
        alignContent={"center"}
        textAlign={"center"}
        minHeight={100}
        {...props}>
        {query.status === "error" && (
          <Typography color="error">
            {errMsg || query.error?.toString() || "数据异常！"}
          </Typography>
        )}
        {query.status === "pending" && <CircularProgress />}
      </Box>
    );
  }
}
import styled from "styled-components";
import theme from '../../theme/theme';

export type variant = keyof typeof theme.alert;

const Box = styled.div<{ variant: variant }>`
  border-radius: ${theme.borderRadius};
  background: ${props => theme.alert[props.variant].bg};
  border: ${props => theme.alert[props.variant].border};
  color: ${props => theme.alert[props.variant].fg};
  margin: 0.5em 1em;
  padding: 0.25em 1em;  
}`;

export default function MessageBox({ children, variant = 'info' }: { children: React.ReactNode, variant: variant }) {
  return (<Box variant={variant}>{children}</Box>);
}
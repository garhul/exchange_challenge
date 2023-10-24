import styled from "styled-components";
import theme from '../../theme';

export type variant = 'error' | 'warning' | 'notice' | 'success';

const Box = styled.div<{ variant: variant }>`
  border-radius: .5em;
  border: ${theme.boxes.borderSize} solid ${props => theme.colors[props.variant]};
  color: ${props => theme.colors[props.variant]};
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  height:100%;
}`;

export default function MessageBox({ children, variant = 'notice' }: { children: React.ReactNode, variant: variant }) {
  return (<Box variant={variant}>{children}</Box>);
}
// @flow

import React from "react";
import styled from "styled-components";
import {
  compose,
  withState,
  withHandlers,
  shouldUpdate,
  onlyUpdateForKeys
} from "recompose";
import NProgress from "nprogress";

import { grabTitleData } from "../common/helpers";
import { TITLE_URL_PATTERN } from "../common/constants";

const Div = styled.div`
  margin-bottom: 1rem;

  text-align: center;
`;
const Input = styled.input`
  width: 70%;

  margin-right: 0.5rem;
  padding-bottom: 0.15rem;

  border-left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #000;

  outline: 0;

  font-size: 2rem;
`;
const Button = shouldUpdate(() => false)(styled.button`
  font-size: 2rem;
`);

const enhance = compose(
  withState("value", "updateValue", ""),
  withHandlers({
    handleChange: props => (event: SyntheticInputEvent<HTMLInputElement>) => {
      props.updateValue(event.target.value);
    },
    handleFocus: props => (event: SyntheticInputEvent<HTMLInputElement>) => {
      event.target.select();
    },
    handleSubmit: props => async (event: Event) => {
      event.preventDefault();

      if (!TITLE_URL_PATTERN.test(props.value)) return;

      NProgress.start();

      try {
        props.bindData(await grabTitleData(props.value));
      } catch (ex) {}

      NProgress.done();
    }
  }),
  onlyUpdateForKeys(["value"])
);

type Props = {
  bindData: (data: {}) => void,
  value: string,
  handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleFocus: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  handleSubmit: (event: Event) => Promise<void>
};

export default enhance(
  ({ value, handleChange, handleFocus, handleSubmit }: Props) => (
    <Div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="https://www.vtvgiaitri.vn/title/quynh-bup-be"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <Button type="submit">Triển</Button>
      </form>
    </Div>
  )
);

/**
 *
 * PanelSubmitButton
 *
 */
import * as React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectLoadingIndicator } from './slice/selectors';

interface Props {
  name: string;
  style?: object;
}

export function PanelSubmitButton(props: Props) {
  const { display } = useAppSelector(selectLoadingIndicator);
  const displayAttr = display ? { display: 'none' } : {};
  const style = props.style? {...props.style,...displayAttr } : {...displayAttr };

  return (
    <p className="form-submit login-submit d-flex align-items-center justify-content-between mb-0">
      <span
        className="load_span"
        style={display ? { display: 'block' } : { display: 'none' }}
      >
        <span className="loader_2" />
      </span>
      <input
        value={props.name}
        type="submit"
        className="button-default login-submit"
        style={style}
      />
    </p>
  );
}

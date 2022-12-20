import * as React from "react";
import { useNavigate } from "react-router-dom";
import { goBack, settings } from "../icons";
import { Paths } from "../../types/types";
import "./Navbar.css";

interface Props {
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
  settingState: Boolean;
}

const Navbar: React.FC<Props> = React.memo(
  ({ setSettingsState, settingState }) => {
    const navigator = useNavigate();

    return (
      <div className="navigation">
        <button
          className="button"
          onClick={() => {
            settingState
              ? setSettingsState(!settingState)
              : navigator(Paths.Start);
          }}
        >
          {goBack}
        </button>
        <button
          className="button"
          onClick={() => setSettingsState(!settingState)}
        >
          {settings}
        </button>
      </div>
    );
  }
);

export default Navbar;

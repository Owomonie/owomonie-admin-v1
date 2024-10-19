import { useNavigate } from "react-router-dom";

export interface ExtraArgs {
  navigate: ReturnType<typeof useNavigate>;
}

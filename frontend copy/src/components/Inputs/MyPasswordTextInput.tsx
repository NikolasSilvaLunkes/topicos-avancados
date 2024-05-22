import { useFormContext, Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Box,
  Divider,
  Grid,
  GridProps,
  IconButton,
  InputAdornment,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type IProps = {
  name: string;
  label?: string;
  gridProps?: GridProps;
};

export type Props = IProps & TextFieldProps;

export default function MyPasswordTextInput({
  name,
  label,
  gridProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Grid item {...gridProps}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            focused={true}
            label={label}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            error={!!error}
            helperText={error?.message}
            autoComplete="nope"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    color="primary"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <RemoveRedEyeIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...other}
          />
        )}
      />
    </Grid>
  );
}

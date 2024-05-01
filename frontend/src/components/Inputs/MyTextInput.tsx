import { useFormContext, Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Box,
  Divider,
  Grid,
  GridProps,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";

type IProps = {
  name: string;
  label?: string;
  gridProps?: GridProps;
};

export type Props = IProps & TextFieldProps;

export default function MyTextField({
  name,
  label,
  gridProps,
  ...other
}: Props) {
  const { control } = useFormContext();

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
            {...other}
          />
        )}
      />
    </Grid>
  );
}

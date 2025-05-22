import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/navigation"; // <-- Import useRouter

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme }) => ({
  variants: [
    {
      props: { checked: true },
      style: {
        ".MuiFormControlLabel-label": {
          color: theme.palette.primary.main,
        },
      },
    },
  ],
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function UseRadioGroup() {
  const [value, setValue] = React.useState("first");
  const router = useRouter();

  React.useEffect(() => {
    if (value === "admin") {
      router.push("/adminregister"); // Replace with your admin page path
    } else if (value === "client") {
      router.push("/register"); // Replace with your client page path
    }
  }, [value, router]);

  return (
    <RadioGroup
      name="use-radio-group"
      defaultValue="first"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <MyFormControlLabel value="admin" label="Admin" control={<Radio />} />
      <MyFormControlLabel value="client" label="Client" control={<Radio />} />
    </RadioGroup>
  );
}

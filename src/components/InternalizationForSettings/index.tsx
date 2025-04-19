import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TabPanel } from "../TabPanel";
export const InternalizationForSettings = ({ tabValue, toast }: any) => {
  return (
    <TabPanel value={tabValue} index={1}>
      <Card>
        <CardHeader title="Налаштування мови" />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="language-label">Мова інтерфейсу</InputLabel>
            <Select
              labelId="language-label"
              id="language"
              defaultValue="ua"
              label="Мова інтерфейсу"
              onChange={() => {
                toast({
                  title: "Мову змінено",
                  description: "Мову інтерфейсу змінено.",
                });
              }}
            >
              <MenuItem value="ua">Українська</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="pol">Польська</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Застосувати зміни
          </Button>
        </CardActions>
      </Card>
    </TabPanel>
  );
};

import type React from "react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Tabs, Tab, Typography, Box, SelectChangeEvent } from "@mui/material";
import {
  Person as UserIcon,
  Language as GlobeIcon,
  Message as MessageSquareIcon,
} from "@mui/icons-material";

import { useToast } from "../../hooks/useToast";

import { AddReviews } from "../addReviews";
import { InternalizationForSettings } from "../InternalizationForSettings";
import { ProfileSettings } from "../ProfileSettings";

export const Settings = () => {
  const { toast, Snackbar } = useToast();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    []
  );

  return (
    <div className="container mx-auto py-10">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Налаштування
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab icon={<UserIcon />} label="Профіль" />
          <Tab icon={<GlobeIcon />} label="Мова" />
          <Tab icon={<MessageSquareIcon />} label="Відгук" />
        </Tabs>
      </Box>

      <ProfileSettings tabValue={tabValue} toast={toast} index={0} />

      <InternalizationForSettings tabValue={tabValue} toast={toast} />

      <AddReviews tabValue={tabValue} />

      {Snackbar}
    </div>
  );
};

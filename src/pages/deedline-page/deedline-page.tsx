import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IDeedline } from "../../interfaces/deedline.interface";
import { getDeedlines } from "../../services/api.service";
import { DeedlineTable } from "./deedline-table/deedline-table";
import { AxiosError } from "axios";

export const DeedlinePage: React.FC = () => {
  const [deedlines, setDeedlines] = useState<IDeedline[]>([]);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getDeedlines()
      .then((data) => {
        setDeedlines(data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          window.localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/login";
        }
      });
  }, [reload]);

  return (
    <>
      <MiniDrawer>
        <Typography sx={{ mb: 2 }} variant="h4" component="h2">
          Срок действия
        </Typography>

        <DeedlineTable deedlines={deedlines} />
      </MiniDrawer>
    </>
  );
};

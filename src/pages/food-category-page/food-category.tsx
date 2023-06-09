import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { getCategory } from "../../services/api.service";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ICategory } from "../../interfaces/categorys.interfaces";
import { FoodCategoryTable } from "./category-table/category-table";
import { AddCategoryModal } from "./add-category-modal/add-category-modal";
import { AxiosError } from "axios";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const FoodCategoryPage: React.FC = () => {
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { reload } = useContext(ReloadContext);

  useEffect((): void => {
    getCategory()
      .then((data) => {
        setCategorys(data);
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
      <AddCategoryModal open={open} setOpen={setOpen} />
      <MiniDrawer>
        <FlexWrapper>
          <Typography variant="h4" component="h2">
            Категория еды
          </Typography>
          <Button
            onClick={(): void => setOpen(true)}
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
          >
            Добавить категорию
          </Button>
        </FlexWrapper>
        <FoodCategoryTable categorys={categorys} />
      </MiniDrawer>
    </>
  );
};
